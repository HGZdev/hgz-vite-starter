// src/_server/graphql/counter.ts
import {GraphQLObjectType, GraphQLInt, GraphQLString} from "graphql";

interface CounterType {
  id: string;
  value: number;
}

interface CounterRow {
  id: number;
  value: number;
}

const CounterGraphQLType = new GraphQLObjectType({
  name: "Counter",
  fields: {
    id: {type: GraphQLString},
    value: {type: GraphQLInt},
  },
});

const queries: QueryFields = {
  counter: {
    type: CounterGraphQLType,
    resolve: async (_, _args, {db}: {db: Database}) => {
      return new Promise<CounterType>((resolve, reject) => {
        db.get(
          "SELECT id, value FROM counters WHERE id = 1",
          (err: Error | null, row: CounterRow) => {
            if (err) reject(err);
            else resolve({id: row.id.toString(), value: row.value});
          }
        );
      });
    },
  },
};
const mutations: MutationFields = {
  incrementCounter: {
    type: CounterGraphQLType,
    resolve: async (_, _args, {db}: {db: Database}) => {
      return new Promise<CounterType>((resolve, reject) => {
        db.run(
          "UPDATE counters SET value = value + 1 WHERE id = 1",
          (err: Error | null) => {
            if (err) reject(err);
            else {
              db.get(
                "SELECT id, value FROM counters WHERE id = 1",
                (err: Error | null, updatedRow: CounterRow) => {
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
};

export default {queries, mutations};
