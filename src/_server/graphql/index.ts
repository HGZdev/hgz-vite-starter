import makeSchema from "../../../lib/graphql/makeSchema.ts";
import Counter from "./counter.ts";

const schema = makeSchema([Counter]);

export default schema;
