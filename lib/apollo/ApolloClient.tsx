import React from "react";
import {
  ApolloProvider as ApolloProviderOrg,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const {PROD} = import.meta.env;

export const makeApolloProvider = (config: Config) => {
  const {PROD_HOST_URL, LOCAL_HOST_URL, LOCAL_SERVER_PORT, GRAPHQL_DIR} =
    config;
  const cache = new InMemoryCache();

  const BASE_URL = PROD
    ? PROD_HOST_URL
    : `${LOCAL_HOST_URL}:${LOCAL_SERVER_PORT}`;

  const client = new ApolloClient({
    uri: `${BASE_URL}${GRAPHQL_DIR}`,
    cache,
    connectToDevTools: !PROD, // 'true' - Apollo in browser devtools also in prod mode
  });

  return ({children}: {children?: React.ReactNode}) => (
    <ApolloProviderOrg {...{client}}>{children}</ApolloProviderOrg>
  );
};
