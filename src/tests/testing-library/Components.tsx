import {
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
} from "react-router-dom";
import config from "../../../config/config";
import {makeApolloProvider} from "../../../lib/apollo/ApolloClient";
import GlobalStyles from "../../styles/GlobalStyles";
import {RoutesConfig} from "../../client/Root";
import {render} from "@testing-library/react";

export const renderMockRoot = ({
  Routes = RoutesConfig,
  initialEntries = ["/"],
}: {
  Routes?: React.ReactNode;
  initialEntries?: string[] | undefined;
} = {}) => {
  // create ApolloProvider here for mock server queries isolation
  const ApolloProvider = makeApolloProvider(config);

  // Router v6 data router
  const router = createMemoryRouter(createRoutesFromElements(Routes), {
    initialEntries,
    initialIndex: 0,
  });

  const renderResult = render(
    <ApolloProvider>
      <GlobalStyles />
      <RouterProvider router={router} future={{v7_startTransition: true}} />
    </ApolloProvider>
  );

  // supposedly the only way to get current location for Data Router v6 in tests https://stackoverflow.com/a/73730116
  return {render: renderResult, router};
};
