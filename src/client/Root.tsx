import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LandingPage from "./LandingPage";
import ApolloProvider from "./ApolloProvider";
import Registration from "./Registration";
import ErrorPage from "./ErrorPage";
// import GlobalStyles from "./globalStyles.ts";

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
