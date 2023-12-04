import {type CounterType} from "../graphql/counter.ts";
import {makeGQL, makeMutationHook, makeQueryHook} from "./helpers.ts";

type CounterTData = {
  getCounter: CounterType;
};
type CounterTVariables = object;

export const getCounterGQL = makeGQL({
  name: "getCounter",
  operationType: "query",
  fields: ["id", "value"],
});

export const useGetCounter = makeQueryHook<CounterTData, CounterTVariables>(
  getCounterGQL
);

type IncrementCounterTData = {
  incrementCounter: CounterType;
};
type IncrementCounterTVariables = object;

export const incrementCounterGQL = makeGQL({
  name: "incrementCounter",
  operationType: "mutation",
  fields: ["id", "value"],
});

export const useIncrementCounter = makeMutationHook<
  IncrementCounterTData,
  IncrementCounterTVariables
>(incrementCounterGQL);
