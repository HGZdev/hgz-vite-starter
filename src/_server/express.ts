import express from "express";
import http from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import db from "./database/index.js";
import {
  makeApolloServer,
  ApolloServerPluginDrainHttpServer,
  expressMiddleware,
} from "../../lib/apollo/index.ts";
import schema from "./graphql/index.ts";

const LOCAL_SERVER_PORT = 8080;
console.log("process.env.JWT_SECRET:", process.env.JWT_SECRET);

const getUserFromToken = (token: string) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET || "a");
      return user;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

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
    context: async (req) =>
      // @ts-ignore
      console.log() || {
        ...req,
        db,
        // @ts-ignore
        user: getUserFromToken(req.headers?.token), // Add logged user to context
      },
  })
);

await new Promise<void>((resolve) => {
  httpServer.listen({port: LOCAL_SERVER_PORT}, () => resolve());
});
console.log(
  `🚀 Server is running at http://localhost:${LOCAL_SERVER_PORT}/graphql`
);
