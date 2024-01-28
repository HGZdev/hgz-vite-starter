// LoginModal.test.tsx
import {screen, waitFor} from "@testing-library/react";
import userEvent, {type UserEvent} from "@testing-library/user-event";
import {describe, test, beforeEach, expect, vi} from "vitest";
import {mockServer} from "../../tests/vitestSetup";
import {
  counterIncrementingRes,
  getUserLoggedInRes,
  getUserMeLoggedInRes,
  getUserMeNotLoggedInRes,
  makeInvalidCredsLogin,
  makeSuccessfulLogin,
} from "../../tests/graphqlHandlers";
import {findBtn, findId, findText} from "../../tests/testing-library/helpers";
import {Route} from "react-router-dom";
import LoginModal from "./LoginModal";
import LandingPage from "../Pages/LandingPage";
import {renderMockRoot} from "../../tests/testing-library/Components";

describe("LoginModal Component Tests", () => {
  let onCloseMock: () => void;
  let user: UserEvent;
  beforeEach(() => {
    onCloseMock = vi.fn();
    user = userEvent.setup();
    mockServer.use(...getUserMeNotLoggedInRes, ...counterIncrementingRes);
  });

  test("go to LoginModal, than go back when Cancel button is clicked", async () => {
    const {router} = renderMockRoot({
      initialEntries: ["/"],
      Routes: <Route path="/" element={<LandingPage />} />,
    });

    expect(screen.getByTestId("loading"));
    expect(await findBtn("Login"));

    await user.click(await findBtn("Login"));

    expect(await findId("LoginModal")).toMatchSnapshot();
    expect(await findBtn("Register"));
    expect(await findBtn("Cancel"));
    expect(await findBtn("Login"));

    await user.click(await findBtn("Cancel"));

    expect(router.state.location.pathname).toEqual("/");
    expect(await findId("LandingPage"));
  });

  test("calls onClose when Cancel button is clicked", async () => {
    renderMockRoot({
      initialEntries: ["/"],
      Routes: (
        <Route path="/" element={<LoginModal open onClose={onCloseMock} />} />
      ),
    });

    expect(await findBtn("Cancel"));
    await user.click(await findBtn("Cancel"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("displays validation errors for empty fields on form submission", async () => {
    renderMockRoot({
      initialEntries: ["/"],
      Routes: (
        <Route path="/" element={<LoginModal open onClose={onCloseMock} />} />
      ),
    });
    user.click(await findBtn("Login"));

    await waitFor(async () => {
      expect(await findText("Email is required"));
      expect(await findText("Password is required"));
    });
  });

  test("handles login error and displays error message", async () => {
    mockServer.use(...makeInvalidCredsLogin, ...getUserMeNotLoggedInRes);

    const {
      render: {findByLabelText},
    } = renderMockRoot({
      initialEntries: ["/"],
      Routes: (
        <Route path="/" element={<LoginModal open onClose={onCloseMock} />} />
      ),
    });

    // Trigger a login attempt
    await user.type(await findByLabelText("Email"), "test@example.com");
    await user.type(await findByLabelText("Password"), "incorrectPassword");
    await user.click(await findBtn("Login"));

    await user.click(await findBtn("Login"));

    // Wait for the error message to appear
    expect((await findId("error-banner")).innerHTML).toContain(
      "Something went wrong"
    );
  });
  test("handles successful login", async () => {
    mockServer.use(
      ...makeSuccessfulLogin,
      ...getUserMeLoggedInRes,
      ...getUserLoggedInRes
    );

    const {
      render: {findByLabelText},
    } = renderMockRoot({
      initialEntries: ["/"],
      Routes: (
        <Route path="/" element={<LoginModal open onClose={onCloseMock} />} />
      ),
    });

    await user.type(await findByLabelText("Email"), "user@example.com");
    await user.type(await findByLabelText("Password"), "correctPassword");
    await user.click(await findBtn("Login"));

    expect(findId("LoginModal"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
