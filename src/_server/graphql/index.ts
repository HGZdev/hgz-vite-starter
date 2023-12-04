import {type Database} from "sqlite3";
import makeSchema from "../../../lib/graphql/makeSchema.ts";
import Counter from "./counter.ts";
import Users, {type UserType} from "./users.ts";
import type {Request, Response} from "express";

export type GraphQLResolverContext = {
  db: Database;
  req: Request;
  res: Response;
  user?: UserType;
};

const schema = makeSchema<GraphQLResolverContext>([Counter, Users]);

export default schema;
