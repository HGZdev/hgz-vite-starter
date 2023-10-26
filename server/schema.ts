// server/schema.ts
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
} from "graphql";

interface CounterType {
  id: string;
  value: number;
}

// CounterType definition
const CounterType = new GraphQLObjectType({
  name: "Counter",
  fields: {
    id: {type: GraphQLString},
    value: {type: GraphQLInt},
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      counter: {
        type: CounterType,
        resolve: async (_, _args, {db}) => {
          return new Promise<CounterType>((resolve, reject) => {
            db.get(
              "SELECT id, value FROM counters WHERE id = 1",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (err: Error | null, row: any) => {
                if (err) reject(err);
                else resolve({id: row.id.toString(), value: row.value});
              }
            );
          });
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      incrementCounter: {
        type: CounterType,
        resolve: async (_, _args, {db}) => {
          return new Promise<CounterType>((resolve, reject) => {
            db.run(
              "UPDATE counters SET value = value + 1 WHERE id = 1",
              (err: Error | null) => {
                if (err) reject(err);
                else {
                  // After the increment operation, fetch the updated counter
                  db.get(
                    "SELECT id, value FROM counters WHERE id = 1",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (err: Error | null, updatedRow: any) => {
                      if (err) reject(err);
                      else
                        resolve({
                          id: updatedRow.id.toString(),
                          value: updatedRow.value,
                        });
                    }
                  );
                }
              }
            );
          });
        },
      },
    },
  }),
});

export default schema;
