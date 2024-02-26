// Root.tsx
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./Pages/Public/LandingPage.tsx";
import {Helmet} from "react-helmet";
import Registration from "./Pages/Public/Registration.tsx";
import ErrorPage from "./Pages/Public/ErrorPage.tsx";
import {makeApolloProvider} from "../../lib/apollo/ApolloClient.tsx";
import GlobalStyles from "../styles/GlobalStyles.ts";
import PrivateRoute from "./Pages/Private/PrivateRoute.tsx";
import Dashboard from "./Pages/Private/Dashboard.tsx";

export const ApolloProvider = makeApolloProvider(import.meta.env);

export const RoutesConfig = (
  <>
    <Route path="/" element={<LandingPage />} errorElement={<ErrorPage />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />
    <Route path="*" element={<ErrorPage />} />
  </>
);

const router = createBrowserRouter(createRoutesFromElements(RoutesConfig));

const Root: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </Helmet>
      <ApolloProvider>
        <GlobalStyles />
        <RouterProvider router={router} future={{v7_startTransition: true}} />
      </ApolloProvider>
    </>
  );
};

export default Root;
