import makeSchema from "../../../lib/graphql/makeSchema.ts";
import Counter from "./counter.ts";
import Users from "./users.ts";

const schema = makeSchema([Counter, Users]);

export default schema;
