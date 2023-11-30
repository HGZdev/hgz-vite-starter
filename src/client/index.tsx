import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import ApolloProvider from "./ApolloProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider>
      <Root />
    </ApolloProvider>
  </React.StrictMode>
);
