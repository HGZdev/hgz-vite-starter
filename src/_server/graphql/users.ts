import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import {Database} from "sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserRow {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdTs: string;
  updatedTs: string;
  hashedPassword?: string;
}

interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdTs: string;
  updatedTs: string;
  hashedPassword: string;
}

type GraphQLResolverContext = {
  db: Database;
  user?: UserType;
};

const AuthPayloadType = new GraphQLObjectType({
  name: "AuthPayload",
  fields: {
    token: {type: GraphQLString},
  },
});

const GraphQLUserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {type: GraphQLString},
    email: {type: GraphQLString},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    createdTs: {type: GraphQLString},
    updatedTs: {type: GraphQLString},
    hashedPassword: {type: GraphQLString},
  },
});

const DeleteUserResultType = new GraphQLObjectType({
  name: "DeleteUserResult",
  fields: {
    deletedCount: {type: GraphQLInt}, // Assuming you want to return the count of deleted rows
  },
});

const schema = {
  queries: {
    user: {
      type: GraphQLUserType,
      args: {
        id: {type: GraphQLInt},
        email: {type: GraphQLString},
      },
      resolve: async (
        _root: unknown,
        args: {id?: number; email?: string},
        context: GraphQLResolverContext
      ) => {
        return new Promise<UserType>((resolve, reject) => {
          if (!args.id && !args.email) {
            reject(new Error("No valid argument provided for user query"));
            return;
          }

          const queryField = args.id ? "id" : "email";
          const queryValue = args.id ? args.id : args.email;
          const query = `SELECT * FROM users WHERE ${queryField} = ?`;

          context.db.get(
            query,
            [queryValue],
            (err: Error | null, row: UserRow) => {
              if (err) reject(err);
              else resolve(row as unknown as UserType);
            }
          );
        });
      },
    },
    users: {
      type: new GraphQLList(GraphQLUserType),
      resolve: async (
        _root: unknown,
        _args: unknown,
        context: GraphQLResolverContext
      ) => {
        return new Promise<UserType[]>((resolve, reject) => {
          context.db.all(
            "SELECT * FROM users",
            [],
            (err: Error | null, rows: UserRow[]) => {
              if (err) reject(err);
              else resolve(rows.map((row) => row as unknown as UserType));
            }
          );
        });
      },
    },
    isAuth: {
      type: GraphQLBoolean,
      resolve: async (
        _root: unknown,
        _args: unknown,
        context: GraphQLResolverContext
      ) => !!context.user,
    },
  },
  mutations: {
    saveUser: {
      type: GraphQLUserType,
      args: {
        email: {type: new GraphQLNonNull(GraphQLString)},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        password: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (
        _: unknown,
        args: {
          email: string;
          firstName: string;
          lastName: string;
          password: string;
        },
        context: GraphQLResolverContext
      ) => {
        return new Promise<UserType>((resolve, reject) => {
          context.db.serialize(async () => {
            try {
              const hashedPassword = await bcrypt.hash(args.password, 10);

              context.db.get(
                "SELECT id, FROM users WHERE email = ?",
                [args.email],
                (err, row: {id: number}) => {
                  if (err) {
                    reject(err);
                    return;
                  }

                  if (row && row.id !== undefined) {
                    // User exists, update the record
                    context.db.run(
                      "UPDATE users SET firstName = ?, lastName = ?, hashedPassword = ? WHERE email = ?",
                      [
                        args.firstName,
                        args.lastName,
                        hashedPassword,
                        args.email,
                      ],
                      function (err) {
                        if (err) {
                          reject(err);
                          return;
                        }

                        const savedUser: UserType = {
                          id: row ? row.id.toString() : this.lastID.toString(),
                          email: args.email,
                          firstName: args.firstName,
                          lastName: args.lastName,
                          createdTs: new Date().toISOString(),
                          updatedTs: new Date().toISOString(),
                          hashedPassword, // from bcrypt.hash
                        };

                        resolve(savedUser);
                      }
                    );
                  } else {
                    // User does not exist, insert a new record
                    context.db.run(
                      "INSERT INTO users (email, firstName, lastName, hashedPassword) VALUES (?, ?, ?, ?)",
                      [
                        args.email,
                        args.firstName,
                        args.lastName,
                        hashedPassword,
                      ],
                      function (err) {
                        if (err) {
                          reject(err);
                          return;
                        }

                        const savedUser: UserType = {
                          id: this.lastID.toString(),
                          email: args.email,
                          firstName: args.firstName,
                          lastName: args.lastName,
                          createdTs: new Date().toISOString(),
                          updatedTs: new Date().toISOString(),
                          hashedPassword, // from bcrypt.hash
                        };

                        resolve(savedUser);

                        resolve(savedUser); // returning new user info
                      }
                    );
                  }
                }
              );
            } catch (error) {
              reject(error);
            }
          });
        });
      },
    },
    deleteUser: {
      type: DeleteUserResultType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve: async (
        _: unknown,
        args: {id: number},
        context: GraphQLResolverContext
      ) => {
        return new Promise<number>((resolve, reject) => {
          context.db.run(
            "DELETE FROM users WHERE id = ?",
            [args.id],
            function (err) {
              if (err) {
                reject(err);
                return;
              }
              resolve(this.changes); // returning the number of rows deleted
            }
          );
        });
      },
    },
    login: {
      type: AuthPayloadType,
      args: {
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (
        _: unknown,
        args: {
          email: string;
          password: string;
        },
        context: GraphQLResolverContext
      ) => {
        return new Promise<{token: string}>((resolve, reject) => {
          // Fetch the user based on the email
          context.db.get(
            "SELECT * FROM users WHERE email = ?",
            [args.email],
            async (err: Error | null, userRow: UserRow) => {
              if (err) {
                reject(err);
                return;
              }

              // If user not found or password does not match
              if (
                !userRow ||
                !userRow.hashedPassword ||
                !(await bcrypt.compare(args.password, userRow.hashedPassword))
              ) {
                reject(new Error("Invalid credentials"));
                return;
              }

              // User is found and password matches
              const token = jwt.sign(
                {user: userRow},
                process.env.JWT_SECRET || "a",
                {expiresIn: "1h"}
              );
              resolve({token});
            }
          );
        });
      },
    },
  },
};

export default schema;
