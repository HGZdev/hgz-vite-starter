import {GraphQLSchema, GraphQLObjectType} from "graphql";

// e.g. import * as schemasObj from '../../src/_server/graphql'

const makeSchema = (schemasObj: {[key: string]: GraphQLModuleConfig}) => {
  if (!schemasObj) throw new Error("makeSchema: allSchemasObj is undefined");

  let queries = {};
  let mutations = {};

  const schemas = Object.values(schemasObj);
  for (const schema of schemas) {
    queries = {...queries, ...schema.queries};
    mutations = {...mutations, ...schema.mutations};
  }
  // graphQL Root schema

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "QueryRootType",
      fields: () => ({
        ...queries,
      }),
    }),
    mutation: new GraphQLObjectType({
      name: "MutationRootType",
      fields: () => ({
        ...mutations,
      }),
    }),
  });
  return schema;
};

export default makeSchema;
