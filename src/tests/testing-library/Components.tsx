import {MemoryRouter, Routes} from "react-router-dom";
import config from "../../../config/config";
import {makeApolloProvider} from "../../../lib/apollo/ApolloClient";
import GlobalStyles from "../../client/GlobalStyles";
import {RoutesConfig} from "../../client/Root";

export const MockedRoot = ({
  children = RoutesConfig,
  initialEntries = ["/"],
}: {
  children?: React.ReactNode;
  initialEntries?: string[] | undefined;
}) => {
  // create ApolloProvider here for mock server queries isolation
  const ApolloProvider = makeApolloProvider(config);
  return (
    <ApolloProvider>
      <GlobalStyles />
      <MemoryRouter
        future={{v7_startTransition: true}}
        initialEntries={initialEntries}
      >
        <Routes>{children}</Routes>
      </MemoryRouter>
    </ApolloProvider>
  );
};