// server/mockGraphQLHandlers.ts
import {graphql, HttpResponse} from "msw";

export const getUserMeNotLoggedInRes = [
  graphql.query("getUserMe", () => {
    return HttpResponse.json({
      data: {
        getUserMe: null,
      },
    });
  }),
];

export const getUserMeLoggedInRes = [
  graphql.query("getUserMe", () => {
    return HttpResponse.json({
      data: {
        getUserMe: {
          id: 1,
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
        },
      },
    });
  }),
];

// Initial mock counter value for testing Components
const mockCounterValue = 5;

export const counterIncrementingRes = [
  graphql.query("counter", () => {
    return HttpResponse.json({
      data: {
        counter: mockCounterValue,
      },
    });
  }),
  graphql.mutation("incrementCounter", () => {
    return HttpResponse.json({
      data: {
        incrementCounter: true,
      },
    });
  }),
  graphql.query("counter", () => {
    return HttpResponse.json({
      data: {
        counter: mockCounterValue + 1,
      },
    });
  }),
];

export const graphqlHandlers = [
  graphql.query("getUserMe", () => {
    return HttpResponse.json({
      data: {
        getUserMe: {
          id: 1,
          email: "user@example.com",
          firstName: "John",
          lastName: "Doe",
        },
      },
    });
  }),
  graphql.query("counter", () => {
    return HttpResponse.json({
      data: {
        counter: mockCounterValue,
      },
    });
  }),
  graphql.mutation("incrementCounter", () => {
    return HttpResponse.json({
      data: {
        incrementCounter: true,
      },
    });
  }),
  graphql.query("counter", () => {
    return HttpResponse.json({
      data: {
        counter: mockCounterValue + 1,
      },
    });
  }),
];
