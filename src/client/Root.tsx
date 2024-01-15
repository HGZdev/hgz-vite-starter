import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LandingPage from "./Pages/LandingPage.tsx";
import config from "../../config/config.ts";
import Registration from "./Pages/Registration.tsx";
import ErrorPage from "./Pages/ErrorPage.tsx";
import {makeApolloProvider} from "../../lib/apollo/ApolloClient.tsx";
import GlobalStyles from "./GlobalStyles.ts";

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
      <GlobalStyles />
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

export default Root;
