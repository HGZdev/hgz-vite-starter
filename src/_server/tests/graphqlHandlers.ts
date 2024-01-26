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
  graphql.query("getCounter", () => {
    return HttpResponse.json({
      data: {
        getCounter: {id: 1, value: mockCounterValue},
      },
    });
  }),
  graphql.mutation("incrementCounter", () => {
    return HttpResponse.json({
      data: {
        incrementCounter: {id: 1, value: mockCounterValue + 1},
      },
    });
  }),
  graphql.query("getCounter", () => {
    return HttpResponse.json({
      data: {
        getCounter: {id: 1, value: mockCounterValue + 1},
      },
    });
  }),
];
