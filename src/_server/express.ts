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
import {getUserFromToken, getViteConfig} from "./helpers.ts";

const {
  VITE_LOCAL_PORT,
  VITE_LOCAL_SERVER_PORT,
  VITE_PROD_HOST_URL,
  VITE_LOCAL_HOST_URL,
  VITE_GRAPHQL_DIR,
} = getViteConfig(process.env.NODE_ENV);

const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? VITE_PROD_HOST_URL
    : `${VITE_LOCAL_HOST_URL}:${VITE_LOCAL_PORT}`;

const app = express();

app.use(cookieParser());

const httpServer = http.createServer(app);

const apolloServer = await makeApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

await apolloServer.start();

app.use(
  VITE_GRAPHQL_DIR as string,
  cors({
    origin: CLIENT_URL, // Client URL (frontend)
    credentials: true, // required to pass cookies from CORS, as server operates on different port.
  }),
  express.json(),
  expressMiddleware(apolloServer, {
    context: async ({req, res}) => {
      const user = getUserFromToken(req.cookies.token);
      return {req, res, db, user};
    },
  })
);

await new Promise<void>((resolve) => {
  httpServer.listen({port: VITE_LOCAL_SERVER_PORT}, () => resolve());
});
console.log(
  `🚀 Server is running at http://localhost:${VITE_LOCAL_SERVER_PORT}/graphql`
);
