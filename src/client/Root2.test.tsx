// Root.test.js
import {cleanup, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {afterAll, afterEach, beforeEach, describe, expect, test} from "vitest";
import {
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from "react-router-dom";
import {ApolloProvider, routesConfig} from "./Root";
import GlobalStyles from "./GlobalStyles";
import {mockServer} from "../_server/tests/vitestSetup";
import {HttpResponse, graphql} from "msw";

const MockedRoot = ({
  initialEntries = ["/"],
}: {
  initialEntries?: string[] | undefined;
}) => {
  return (
    <ApolloProvider>
      <GlobalStyles />
      <RouterProvider
        router={createMemoryRouter(routesConfig, {
          initialEntries,
        })}
      />
    </ApolloProvider>
  );
};

export const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

describe("Root Component - User logged-in", () => {
  beforeEach(() => {
    mockServer.use(
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
      })
    );
  });
  test('renders dashboard page when path is "/"', async () => {
    render(<MockedRoot />);

    expect(screen.getByTestId("loading"));

    await waitFor(() => {
      expect(screen.getByText(/Dashboard!/i));
    });
  });
});
