// it doesn't work without specifying exact path
export {
  ApolloClient,
  InMemoryCache,
  useQuery,
  useLazyQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client/index.js";
export {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
export {expressMiddleware} from "@apollo/server/express4";

export * from "./ApolloServer.ts";
// for some reasons I can't do the same with ApolloClient.tsx, supposedly due to react.component nature.
// export * from "./ApolloClient.tsx";
