// Root.tsx
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage.tsx";
import config from "../../config/config.ts";
import Registration from "./Pages/Registration.tsx";
import ErrorPage from "./Pages/ErrorPage.tsx";
import {makeApolloProvider} from "../../lib/apollo/ApolloClient.tsx";
import GlobalStyles from "../styles/GlobalStyles.ts";

export const ApolloProvider = makeApolloProvider(config);

export const RoutesConfig = (
  <>
    <Route path="/" element={<LandingPage />} errorElement={<ErrorPage />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="*" element={<ErrorPage />} />
  </>
);

const router = createBrowserRouter(createRoutesFromElements(RoutesConfig));

const Root: React.FC = () => {
  return (
    <ApolloProvider>
      <GlobalStyles />
      <RouterProvider router={router} future={{v7_startTransition: true}} />
    </ApolloProvider>
  );
};

export default Root;
