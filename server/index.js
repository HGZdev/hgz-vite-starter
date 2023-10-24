// npm install @apollo/server express graphql cors
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import schema from "./schema.js";
import db from "./db.js";

const LOCAL_SERVER_PORT = 8080;

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});
await server.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: (req) => ({...req, db}),
  })
);

await new Promise((resolve) =>
  httpServer.listen({port: LOCAL_SERVER_PORT}, resolve)
);
console.log(
  `🚀 Server is running at http://localhost:${LOCAL_SERVER_PORT}/graphql`
);
