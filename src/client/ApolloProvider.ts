import config from "../../config/config.ts";
import {makeApolloProvider} from "../../lib/apollo/ApolloClient.tsx";

const ApolloProvider = makeApolloProvider(config);
export default ApolloProvider;
