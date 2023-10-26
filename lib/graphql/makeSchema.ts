import {GraphQLFieldResolver, GraphQLObjectType, GraphQLSchema} from "graphql";
import {type Database} from "sqlite3";

type GraphQLResolverContext = {
  db: Database;
};

type GraphQLModules = Record<
  string,
  {
    type: GraphQLObjectType<unknown, unknown>;
    resolve: GraphQLFieldResolver<unknown, GraphQLResolverContext>;
  }
>;

const makeSchema = (
  schemas: Array<{queries: GraphQLModules; mutations: GraphQLModules}>
): GraphQLSchema => {
  let queriesAll: GraphQLModules = {};
  let mutationsAll: GraphQLModules = {};

  for (const schema of schemas) {
    queriesAll = {...queriesAll, ...schema.queries};
    mutationsAll = {...mutationsAll, ...schema.mutations};
  }

  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: {...queriesAll},
    }),
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: {...mutationsAll},
    }),
  });
};

export default makeSchema;
