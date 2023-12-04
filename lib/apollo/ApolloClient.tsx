import React from "react";
import {
  ApolloProvider as ApolloProviderOrg,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {getCookie} from "../../src/client/helpers";

const {PROD} = import.meta.env;

export const makeApolloProvider = (config: Config) => {
  const {PROD_HOST_URL, LOCAL_HOST_URL, LOCAL_SERVER_PORT, GRAPHQL_DIR} =
    config;
  const cache = new InMemoryCache();

  const BASE_URL = PROD
    ? PROD_HOST_URL
    : `${LOCAL_HOST_URL}:${LOCAL_SERVER_PORT}`;

  const URI = `${BASE_URL}${GRAPHQL_DIR}`;

  const link = createHttpLink({
    uri: URI,
  });

  const authLink = setContext((_, {headers}) => {
    const token = getCookie("token");
    return {
      headers: {
        ...headers,
        token: token ?? "",
      },
    };
  });

  const client = new ApolloClient({
    cache,
    link: authLink.concat(link), // Concatenate the authLink and the original link
    connectToDevTools: !PROD,
  });

  return ({children}: {children?: React.ReactNode}) => (
    <ApolloProviderOrg {...{client}}>{children}</ApolloProviderOrg>
  );
};
