import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LandingPage from "./LandingPage";
import config from "../../config/config.ts";
import Registration from "./Registration";
import ErrorPage from "./ErrorPage";
import {makeApolloProvider} from "../../lib/apollo/ApolloClient.tsx";
// import GlobalStyles from "./globalStyles.ts";

const ApolloProvider = makeApolloProvider(config);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

const Root: React.FC = () => {
  return (
    <ApolloProvider>
      {/* <GlobalStyles /> */}
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

export default Root;
