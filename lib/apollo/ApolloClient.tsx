import React from "react";
import {
  ApolloProvider as ApolloProviderOrg,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

export const makeApolloProvider = (config: ImportMetaEnv) => {
  const cache = new InMemoryCache();

  const {
    VITE_PROD_HOST_URL,
    VITE_LOCAL_HOST_URL,
    VITE_LOCAL_SERVER_PORT,
    VITE_GRAPHQL_DIR,
  } = config;

  const PROD = process.env.NODE_ENV === "production";

  const BASE_URL = PROD
    ? VITE_PROD_HOST_URL
    : `${VITE_LOCAL_HOST_URL}:${VITE_LOCAL_SERVER_PORT}`;

  const URI = `${BASE_URL}${VITE_GRAPHQL_DIR}`;

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
