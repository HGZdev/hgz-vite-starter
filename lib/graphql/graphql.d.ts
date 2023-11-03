export {};

declare global {
  import type {GraphQLFieldConfig, GraphQLResolveInfo} from "graphql";

  export type Database = {
    get: (
      query: string,
      callback: (error: Error | null, row: any) => void
    ) => void;
    run: (query: string, callback: (error: Error | null) => void) => void;
  };

  export type Arguments = Record<string, unknown>;

  export type FieldResolver<TSource, TContext, Args = Arguments> = (
    source: TSource,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ) => unknown;

  export interface FieldConfig<
    TSource = unknown,
    TContext = {db: Database},
    Args = Arguments
  > extends Omit<GraphQLFieldConfig<TSource, TContext, Args>, "resolve"> {
    resolve: FieldResolver<TSource, TContext, Args>;
  }

  export type QueryFields = {
    [key: string]: FieldConfig | undefined;
  };

  export type MutationFields = {
    [key: string]: FieldConfig | undefined;
  };

  export interface GraphQLModuleConfig {
    queries?: QueryFields;
    mutations?: MutationFields;
  }
}
