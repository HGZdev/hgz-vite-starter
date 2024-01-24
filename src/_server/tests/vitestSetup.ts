// tests/mockServerSetup.ts
import {afterAll, afterEach, beforeAll, beforeEach, vi} from "vitest";
import {cleanup} from "@testing-library/react";
import {setupServer} from "msw/node";

// Start mock server before all tests (no initial tests attached)
export const mockServer = setupServer();

beforeAll(() => {
  // Enable API mocking before tests.
  mockServer.listen({onUnhandledRequest: "error"});
});

beforeEach(() => {
  // Enable API mocking before tests.
  mockServer.listen();
});

afterEach(() => {
  // Reset handlers after each test `important for test isolation`
  mockServer.resetHandlers();

  vi.clearAllMocks();

  // testing-library clean up
  cleanup();
});

// Close server after all tests
afterAll(() => mockServer.close());
