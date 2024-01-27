// LoginModal.test.tsx
import {render, screen, waitFor} from "@testing-library/react";
import userEvent, {type UserEvent} from "@testing-library/user-event";
import {describe, test, beforeEach, expect, vi} from "vitest";
import {mockServer} from "../../tests/vitestSetup";
import {
  counterIncrementingRes,
  getUserMeNotLoggedInRes,
} from "../../tests/graphqlHandlers";
import {MockedRoot} from "../../tests/testing-library/Components";
import {findBtn, findId, findText} from "../../tests/testing-library/helpers";
import {Route} from "react-router-dom";
import LoginModal from "./LoginModal";
import LandingPage from "../Pages/LandingPage";

describe("LoginModal Component Tests", () => {
  let onCloseMock: () => void;
  let user: UserEvent;
  beforeEach(() => {
    onCloseMock = vi.fn();
    user = userEvent.setup();
    mockServer.use(...getUserMeNotLoggedInRes, ...counterIncrementingRes);
  });

  test("go to LoginModal, than go back when Cancel button is clicked", async () => {
    render(
      <MockedRoot>
        <Route path="/" element={<LandingPage />} />
      </MockedRoot>
    );

    expect(screen.getByTestId("loading"));
    expect(await findBtn("Login"));

    await user.click(await findBtn("Login"));

    await waitFor(async () => {
      expect(await findId("LoginModal")).toMatchSnapshot();
      expect(await findBtn("Register"));
      expect(await findBtn("Cancel"));
      expect(await findBtn("Login"));

      await user.click(screen.getByRole("button", {name: "Cancel"}));
      expect(await findId("LandingPage"));
    });
  });

  test("calls onClose when Cancel button is clicked", async () => {
    render(
      <MockedRoot>
        <Route path="/" element={<LoginModal open onClose={onCloseMock} />} />
      </MockedRoot>
    );

    expect(await findBtn("Cancel"));
    await user.click(await findBtn("Cancel"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("displays validation errors for empty fields on form submission", async () => {
    render(
      <MockedRoot>
        <Route path="/" element={<LoginModal open onClose={onCloseMock} />} />
      </MockedRoot>
    );
    user.click(await findBtn("Login"));

    await waitFor(async () => {
      expect(await findText("Email is required"));
      expect(await findText("Password is required"));
    });
  });

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
