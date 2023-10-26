// npm install @apollo/server express graphql cors
import express from "express";
import http from "http";
import cors from "cors";
import db from "./database/counter.js";
import {makeApolloServer} from "../../lib/apollo/ApolloServer.ts";
import {
  ApolloServerPluginDrainHttpServer,
  expressMiddleware,
} from "../../lib/apollo/index.ts";
import schema from "./graphql/index.ts";

const LOCAL_SERVER_PORT = 8080;

const app = express();
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
    context: async (req) => ({...req, db}),
  })
);

await new Promise<void>((resolve) => {
  httpServer.listen({port: LOCAL_SERVER_PORT}, () => resolve());
});
console.log(
  `🚀 Server is running at http://localhost:${LOCAL_SERVER_PORT}/graphql`
);
