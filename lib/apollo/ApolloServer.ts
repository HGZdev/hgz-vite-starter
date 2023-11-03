import {ApolloServer, ApolloServerOptions, BaseContext} from "@apollo/server";
import debug from "debug";

const errDbg = debug("error");

export const makeApolloServer = async <TContext extends BaseContext>(
  config: ApolloServerOptions<TContext>
) => {
  const server = new ApolloServer({
    ...config,
    plugins: [...(config?.plugins || [])],
    formatError: (error) => {
      errDbg(error);
      return error;
    },
  });

  return server;
};
