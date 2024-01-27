import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./Pages/LandingPage.tsx";
import config from "../../config/config.ts";
import Registration from "./Pages/Registration.tsx";
import ErrorPage from "./Pages/ErrorPage.tsx";
import {makeApolloProvider} from "../../lib/apollo/ApolloClient.tsx";
import GlobalStyles from "./GlobalStyles.ts";

export const ApolloProvider = makeApolloProvider(config);

export const RoutesConfig = (
  <>
    <Route path="/" element={<LandingPage />} errorElement={<ErrorPage />} />
    <Route path="/registration" element={<Registration />} />
  </>
);

const Root: React.FC = () => {
  return (
    <ApolloProvider>
      <GlobalStyles />
      <BrowserRouter future={{v7_startTransition: true}}>
        <Routes>{RoutesConfig}</Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Root;
