// server/mockRequests.ts
import {graphql, HttpResponse} from "msw";

// Initial mock counter value for testing Components
const mockCounterValue = 5;

export const graphqlHandlers = [
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
