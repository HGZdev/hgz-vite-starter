// tests/mockServerSetup.ts
import {afterAll, afterEach, beforeAll, beforeEach} from "vitest";
import {cleanup} from "@testing-library/react";
import {setupServer} from "msw/node";
import {graphqlHandlers} from "./mockRequests";

const server = setupServer(...graphqlHandlers);

// Start server before all tests
beforeAll(() => server.listen({onUnhandledRequest: "error"}));

beforeEach(() => {
  // Enable API mocking before tests.
  server.listen();
});

afterEach(() => {
  // Reset handlers after each test `important for test isolation`
  server.resetHandlers();
  // Disable API mocking after the tests are done.
  server.close();
  // testing-library clean up
  cleanup();
});

//  Close server after all tests
afterAll(() => server.close());