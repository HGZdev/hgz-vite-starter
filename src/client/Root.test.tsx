// Root.test.js
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
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

describe("Root Component Tests", () => {
  describe("User logged-out", () => {
    beforeEach(() => {
      mockServer.use(
        graphql.query("getUserMe", () => {
          return HttpResponse.json({
            data: {
              getUserMe: null,
            },
          });
        })
      );
    });
    test('renders landing page when path is "/"', async () => {
      render(<MockedRoot />);

      expect(screen.getByTestId("loading"));
      await waitFor(() => {
        expect(screen.getByText(/Welcome!/i));
      });
    });

    test('renders registration page when navigating to "/registration"', () => {
      render(<MockedRoot initialEntries={["/registration"]} />);
      expect(screen.getByText(/Registration/i));
    });

    // test("navigates to registration page when clicking sign up button", async () => {
    //   render(<MockedRoot />);

    //   await waitFor(() => {
    //     expect(screen.getByText(/Sign Up/i));

    //     userEvent.click(screen.getByText(/Sign Up/i));
    //     // Check if the URL has changed
    //     expect(window.location.pathname).toBe("/registration");
    //   });
    // });
  });

  describe("User logged-in", () => {
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
});
