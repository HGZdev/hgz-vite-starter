import {
  MutationHookOptions,
  QueryHookOptions,
  useQuery,
  useMutation,
  MutationFunctionOptions,
  FetchResult,
  MutationResult,
  TypedDocumentNode,
  OperationVariables,
} from "@apollo/client";

import type {DefinitionNode, DocumentNode} from "graphql";
import gql from "graphql-tag";

/**
 * Generates elements ([[types], [variables]]) of a GraphQL query.
 *
 * @param {Record<string, string>} obj  - object of variable names and types
 *                                      (var: 'Int').
 * @returns {string[]} A two element array with generated type ($var:
 *                     Int) and variable (var: $var) definitions.
 * @example
 *
 *   makeQueryArgs({var: 'Int', anotherVar: 'String'})
 *
 */
const makeQueryElements = (obj: Record<string, string>): [string, string] => {
  const types = [];
  const args = [];

  for (const [k, v] of Object.entries(obj))
    types.push(`$${k}: ${v}`) && args.push(`${k}: $${k}`);

  return [types.join(", "), args.join(", ")].map((elem) =>
    elem ? "(" + elem + ")" : ""
  ) as [string, string];
};

type makeQueryArgs = {
  /** name of the query */
  name: string;
  /** name of the operation (default: query name) */
  operationName?: string;
  operationType: "query" | "mutation";
  /** object of variable names and types (var: 'Int') */
  args?: Record<string, string>;
  /** fields returned by the query */
  fields?: (string | DocumentNode)[];
  /** whether to wrap field list by pagination features, like cursor */
  pagination?: boolean;
  /** additional hook properties; if you don't want to generate a hook, pass false */
  hookOptions?:
    | false
    | QueryHookOptions
    | MutationHookOptions
    | ((variables: unknown) => QueryHookOptions)
    | ((variables: unknown) => MutationHookOptions);
  /** additional properties passed to function returned by mutation hook */
  mutateFnOptions?: (variables: unknown) => MutationFunctionOptions;
};
export const makeGQL = ({
  name,
  operationName = name,
  operationType,
  args,
  fields,
  pagination,
  hookOptions,
  mutateFnOptions,
}: makeQueryArgs): DocumentNode => {
  const [queryTypes, queryArgs] = makeQueryElements({
    ...args,
    ...(pagination && {
      cursor: "ShortString",
      limit: "Int",
      sort: "JSONObject",
    }),
  });

  let queryBody = fields ? `{ ${fields.join("\n")} }` : "";
  if (pagination)
    queryBody = `{ items ${queryBody} cursor prevCursor subTotal total }`;

  const gqlObj = gql`
		${operationType} ${operationName}${queryTypes} {
			${name}${queryArgs} ${queryBody}
		}
	`;

  if (hookOptions || hookOptions === false) {
    // it's a bit hacky but works 🤷
    for (const def of gqlObj.definitions as (DefinitionNode &
      Pick<makeQueryArgs, "hookOptions" | "mutateFnOptions">)[]) {
      def.hookOptions = hookOptions;
      def.mutateFnOptions = mutateFnOptions;
    }
  }

  return gqlObj;
};

export const makeQueryHook = <TData, TVariables extends OperationVariables>(
  query: TypedDocumentNode<TData, TVariables>,
  defaultOptions?:
    | QueryHookOptions<TData, TVariables>
    | ((variables?: TVariables) => QueryHookOptions<TData, TVariables>)
) => {
  return (
    variables?: TVariables,
    options?: Omit<QueryHookOptions<TData, TVariables>, "variables">
  ) => {
    const defaults =
      typeof defaultOptions === "function"
        ? defaultOptions(variables)
        : defaultOptions;
    const result = useQuery(query, {
      ...defaults,
      ...options,
      variables: {...defaults?.variables, ...variables} as TVariables,
    });

    return result;
  };
};

type mutationHookReturn<TData, TVariables> = [
  (
    variables?: TVariables,
    functionOptions?: Omit<
      MutationFunctionOptions<TData, TVariables>,
      "variables"
    >
  ) => Promise<FetchResult<TData>>,
  MutationResult<TData>
];

export const makeMutationHook = <TData, TVariables>(
  mutation: TypedDocumentNode<TData, TVariables>,
  hookDefaults?: MutationHookOptions<TData, TVariables>,
  functionDefaults?: (
    variables?: TVariables
  ) => MutationFunctionOptions<TData, TVariables>
) => {
  return (
    hookOptions?: MutationHookOptions<TData, TVariables>
  ): mutationHookReturn<TData, TVariables> => {
    const [mutate, result] = useMutation(mutation, {
      ...hookDefaults,
      ...hookOptions,
    });
    return [
      (variables, functionOptions) => {
        const defaults = functionDefaults?.(variables);
        return mutate({
          ...defaults,
          ...functionOptions,
          variables: {...defaults?.variables, ...variables} as TVariables,
        });
      },
      result,
    ];
  };
};
