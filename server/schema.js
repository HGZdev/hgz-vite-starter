import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLBoolean,
} from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      counter: {
        type: GraphQLInt,
        resolve: async (_, args, {db}) => {
          return new Promise((resolve, reject) => {
            db.get("SELECT value FROM counters WHERE id = 1", (err, row) => {
              if (err) reject(err);
              else resolve(row.value);
            });
          });
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      incrementCounter: {
        type: GraphQLBoolean,
        resolve: async (_, args, {db}) => {
          return new Promise((resolve, reject) => {
            db.run(
              "UPDATE counters SET value = value + 1 WHERE id = 1",
              (err) => {
                if (err) reject(err);
                else resolve(true);
              }
            );
          });
        },
      },
    },
  }),
});

export default schema;
