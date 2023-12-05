import {GraphQLObjectType, GraphQLInt, GraphQLString} from "graphql";
import {type GraphQLResolverContext} from ".";

export interface CounterRow {
  id: number;
  value: number;
}

export interface CounterType {
  id: string;
  value: number;
}

const GraphQLCounterType = new GraphQLObjectType({
  name: "Counter",
  fields: {
    id: {type: GraphQLString},
    value: {type: GraphQLInt},
  },
});

const schema = {
  queries: {
    getCounter: {
      type: GraphQLCounterType,
      resolve: async (
        _root: unknown,
        _args: unknown,
        context: GraphQLResolverContext
      ) => {
        return new Promise<CounterType>((resolve, reject) => {
          context.db.get(
            "SELECT id, value FROM counters WHERE id = 1",
            (err: Error | null, row: CounterRow) => {
              if (err) reject(err);
              else resolve({id: row.id.toString(), value: row.value});
            }
          );
        });
      },
    },
  },
  mutations: {
    incrementCounter: {
      type: GraphQLCounterType,
      resolve: async (
        _root: unknown,
        _args: unknown,
        context: GraphQLResolverContext
      ) => {
        return new Promise<CounterType>((resolve, reject) => {
          context.db.run(
            "UPDATE counters SET value = value + 1 WHERE id = 1",
            (err: Error | null) => {
              if (err) reject(err);
              else {
                // After the increment operation, fetch the updated counter
                context.db.get(
                  "SELECT id, value FROM counters WHERE id = 1",
                  (err: Error | null, updatedRow: CounterRow) => {
                    // Replace 'any' with a type that describes the shape of your rows.
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
};

export default schema;
