// src/client/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ApolloProvider from "./ApolloProvider.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
