import React from "react";
import {
  ApolloProvider as ApolloProviderOrg,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const {PROD} = import.meta.env;

interface Config {
  PROD_HOST_URL: string;
  LOCAL_HOST_URL: string;
  LOCAL_SERVER_PORT: number;
  GRAPHQL_DIR: string;
}

export const makeApolloProvider = (config: Config) => {
  const {PROD_HOST_URL, LOCAL_HOST_URL, LOCAL_SERVER_PORT, GRAPHQL_DIR} =
    config;

  const cache = new InMemoryCache();

  const BASE_URL = PROD
    ? PROD_HOST_URL
    : `${LOCAL_HOST_URL}:${LOCAL_SERVER_PORT}`;

  const URI = `${BASE_URL}${GRAPHQL_DIR}`;

  const link = createHttpLink({
    uri: URI, // Server URL (must be absolute)
    credentials: "include", // required to pass cookies from CORS, as client operates on different port.
  });

  const client = new ApolloClient({
    cache,
    link,
    connectToDevTools: !PROD,
  });

  return ({children}: {children?: React.ReactNode}) => (
    <ApolloProviderOrg {...{client}}>{children}</ApolloProviderOrg>
  );
};
