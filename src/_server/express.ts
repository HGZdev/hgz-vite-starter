import express from "express";
import http from "http";
import cors from "cors";

import db from "./database/index.js";
import {
  makeApolloServer,
  ApolloServerPluginDrainHttpServer,
  expressMiddleware,
} from "../../lib/apollo/index.ts";
import schema from "./graphql/index.ts";
import cookieParser from "cookie-parser";
import {getUserFromToken} from "./helpers.ts";

const LOCAL_SERVER_PORT = 8080;
console.log("process.env.JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

app.use(cookieParser());

const httpServer = http.createServer(app);

const apolloServer = await makeApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

await apolloServer.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(apolloServer, {
    context: async ({req}) => {
      // @ts-ignore
      const user = getUserFromToken(req.headers.token);
      return {...req, db, user}; // Add database and logged user to context
    },
  })
);

await new Promise<void>((resolve) => {
  httpServer.listen({port: LOCAL_SERVER_PORT}, () => resolve());
});
console.log(
  `🚀 Server is running at http://localhost:${LOCAL_SERVER_PORT}/graphql`
);
