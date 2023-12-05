import {
  GraphQLFieldResolver,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLScalarType,
} from "graphql";

type GraphQLModules<GraphQLResolverContext> = Record<
  string,
  {
    type:
      | GraphQLObjectType<unknown, unknown>
      | GraphQLList<GraphQLObjectType<unknown, unknown>>
      | GraphQLScalarType<boolean, boolean>;
    resolve: GraphQLFieldResolver<unknown, GraphQLResolverContext>;
  }
>;

const makeSchema = <GraphQLResolverContext>(
  schemas: Array<{
    queries: GraphQLModules<GraphQLResolverContext>;
    mutations: GraphQLModules<GraphQLResolverContext>;
  }>
): GraphQLSchema => {
  let queriesAll: GraphQLModules<GraphQLResolverContext> = {};
  let mutationsAll: GraphQLModules<GraphQLResolverContext> = {};

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
