// src/_server/index.ts
import express from "express";
import http from "http";
import path from "path";
import favicon from "serve-favicon";
import cors from "cors";
import debug from "debug";
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import {makeSchema} from "../../lib/graphql/index.ts";
import db from "./database/counter.ts";
import config from "../../config/index.ts";
import {makeApolloServer} from "../../lib/apollo/ApolloServer.ts";
import * as schemasObj from "./graphql/index.ts";

const expressDbg = debug("express");

const {LOCAL_SERVER_PORT, APP_ICON_PATH, GRAPHQL_DIR} = config;
const {PORT = LOCAL_SERVER_PORT, PWD: ABSOLUTE_PATH = ""} = process.env;

const app = express();
const httpServer = http.createServer(app);

// serve favicon
app.use(favicon(path.join(ABSOLUTE_PATH, APP_ICON_PATH)));

// NOTE: trigger before React Router 'all-paths-to-root' redirection for getting '/graphql' playground access

// redirects all url to one public root './build/index.html', so React Router can control it on client-site
// app.get("*", (_req, res) => {
//   res.sendFile(path.join(ABSOLUTE_PATH, OUT_DIR, "index.html"));
// });

const apolloServer = await makeApolloServer({
  schema: makeSchema(schemasObj),
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

app.use(
  GRAPHQL_DIR,
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(apolloServer, {
    context: async (req) => ({...req, db}),
  })
);

await apolloServer.start();

await new Promise<void>((resolve) => httpServer.listen({port: PORT}, resolve));

const msg = `🚀 Server ready at ${ABSOLUTE_PATH}:${PORT}/${GRAPHQL_DIR} 🚀`;

console.log(msg);
expressDbg(msg);
