// LoginModal.test.tsx
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, test, beforeEach, expect, vi} from "vitest";
import {mockServer} from "../../_server/tests/vitestSetup";
import {
  counterIncrementingRes,
  getUserMeNotLoggedInRes,
} from "../../_server/tests/graphqlHandlers";
import {makeApolloProvider} from "../../../lib/apollo/ApolloClient";
import config from "../../../config/config";
import {routesConfig} from "../Root";
import GlobalStyles from "../GlobalStyles";
import {MemoryRouter, Routes} from "react-router-dom";

const MockedRoot = ({
  routes = routesConfig,
  initialEntries = ["/"],
}: {
  routes?: React.ReactNode;
  initialEntries?: string[] | undefined;
}) => {
  // create ApolloProvider here for mock server queries isolation
  const ApolloProvider = makeApolloProvider(config);
  return (
    <ApolloProvider>
      <GlobalStyles />
      <MemoryRouter
        future={{v7_startTransition: true}}
        initialEntries={initialEntries}
      >
        <Routes>{routes}</Routes>
      </MemoryRouter>
    </ApolloProvider>
  );
};

const findBtn = async (buttonName: string | RegExp) =>
  await screen.findByRole("button", {name: buttonName});
const findId = async (id: string | RegExp) => await screen.findByTestId(id);

describe("LoginModal Component Tests", () => {
  beforeEach(() => {
    mockServer.use(...getUserMeNotLoggedInRes, ...counterIncrementingRes);
  });

  test("go to LoginModal with form", async () => {
    render(<MockedRoot />);

    const user = userEvent.setup();
    expect(screen.getByTestId("loading"));
    expect(await findBtn("Login"));

    await user.click(await findBtn("Login"));

    await waitFor(async () => {
      expect(await findId("LoginModal")).toMatchSnapshot();
      expect(await findBtn("Register"));
      expect(await findBtn("Cancel"));

      expect(await findBtn("Login"));
    });
  });

  test("calls onClose when Cancel button is clicked", async () => {
    const onCloseMock = vi.fn();
    render(<MockedRoot />);

    const user = userEvent.setup();
    expect(screen.getByTestId("loading"));
    expect(await findBtn("Login"));

    await user.click(await findBtn("Login"));

    await waitFor(async () => {
      expect(await findBtn("Cancel"));
      userEvent.click(screen.getByRole("button", {name: "Cancel"}));

      expect(await findId("LandingPage"));
    });

    await waitFor(async () => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  // test("displays validation errors for empty fields on form submission", async () => {
  //   render(<LoginModal open onClose={onCloseMock} />);

  //   await act(async () => {
  //     userEvent.click(screen.getByRole("button", {name: "Login"}));
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText("Email is required"));
  //     expect(screen.getByText("Password is required"));
  //   });
  // });

  // test("handles login error and displays error message", async () => {
  //   // Mocking login function to simulate an error
  //   vi.mock("../../_server/queries", () => ({
  //     ...vi.requireActual("../../_server/queries"),
  //     useLogin: () => [
  //       async () => {
  //         throw new Error("Mock login error");
  //       },
  //     ],
  //   }));

  //   render(<LoginModal open onClose={onCloseMock} />);

  //   await act(async () => {
  //     userEvent.type(screen.getByLabelText("Email"), "test@example.com");
  //     userEvent.type(screen.getByLabelText("Password"), "password123");
  //     userEvent.click(screen.getByRole("button", {name: "Login"}));
  //   });

  //   await waitFor(() => {
  //     expect(onCloseMock).not.toHaveBeenCalled();
  //     expect(screen.getByText("Something went wrong"));
  //   });
  // });

  // test("submits login form successfully and calls onClose", async () => {
  //   // Mocking login function to simulate a successful login
  //   vi.mock("../../_server/queries", () => ({
  //     ...vi.requireActual("../../_server/queries"),
  //     useLogin: () => [async () => ({data: {login: {token: "mockToken"}}})],
  //   }));

  //   render(<LoginModal open onClose={onCloseMock} />);

  //   await act(async () => {
  //     userEvent.type(screen.getByLabelText("Email"), "test@example.com");
  //     userEvent.type(screen.getByLabelText("Password"), "password123");
  //     userEvent.click(screen.getByRole("button", {name: "Login"}));
  //   });

  //   await waitFor(() => {
  //     expect(onCloseMock).toHaveBeenCalled();
  //   });
  // });
});
