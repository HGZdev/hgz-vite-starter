// LoginModal.test.tsx
import {waitFor} from "@testing-library/react";
import userEvent, {type UserEvent} from "@testing-library/user-event";
import {describe, test, beforeEach, expect, vi} from "vitest";
import {mockServer} from "../../../tests/vitestSetup";
import {
  counterIncrementingRes,
  getUserLoggedInRes,
  getUserMeLoggedInRes,
  getUserMeNotLoggedInRes,
  makeInvalidCredsLogin,
  makeSuccessfulLogin,
} from "../../../tests/graphqlHandlers";
import {
  findBtn,
  findId,
  findText,
} from "../../../tests/testing-library/helpers";
import {Route} from "react-router-dom";
import LoginModal from "./LoginModal";
import {renderMockRoot} from "../../../tests/testing-library/Components";
import {RoutesConfig} from "../../Root";

describe("LoginModal Component Tests", () => {
  let onCloseMock: () => void;
  let user: UserEvent;
  beforeEach(() => {
    onCloseMock = vi.fn();
    user = userEvent.setup();
    mockServer.use(getUserMeNotLoggedInRes, ...counterIncrementingRes);
  });

  test("LandingPage:Login (clicked) => LoginModal:Cancel => LandingPage:Login => LoginModal:Register => Registration", async () => {
    const {router} = renderMockRoot({
      initialEntries: ["/"],
      Routes: RoutesConfig,
    });

    expect(await findBtn("Login"));
    await user.click(await findBtn("Login"));

    // screen.debug();
    expect(await findId("LoginModal")).toMatchSnapshot();
    expect(await findText("Register"));
    expect(await findBtn("Cancel"));
    expect(await findBtn("Login"));

    await user.click(await findBtn("Cancel"));

    expect(router.state.location.pathname).toEqual("/");
    expect(await findId("LandingPage"));

    await user.click(await findBtn("Login"));
    expect(await findText("Register"));
    await user.click(await findText("Register"));

    expect(router.state.location.pathname).toEqual("/registration");
    expect(await findId("Registration"));
  });

  test("calls onClose when Cancel button is clicked", async () => {
    renderMockRoot({
      initialEntries: ["/"],
      Routes: <Route path="/" element={<LoginModal onClose={onCloseMock} />} />,
    });

    expect(await findBtn("Cancel"));
    await user.click(await findBtn("Cancel"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("displays validation errors for empty fields on form submission", async () => {
    renderMockRoot({
      initialEntries: ["/"],
      Routes: <Route path="/" element={<LoginModal onClose={onCloseMock} />} />,
    });
    user.click(await findBtn("Login"));

    await waitFor(async () => {
      expect(await findText("Email is required"));
      expect(await findText("Password is required"));
    });
  });

  test("handles login error and displays error message", async () => {
    mockServer.use(makeInvalidCredsLogin, getUserMeNotLoggedInRes);

    const {
      render: {findByLabelText},
    } = renderMockRoot({
      initialEntries: ["/"],
      Routes: <Route path="/" element={<LoginModal onClose={onCloseMock} />} />,
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
      makeSuccessfulLogin,
      getUserMeLoggedInRes,
      getUserLoggedInRes
    );

    const {
      render: {findByLabelText},
    } = renderMockRoot({
      initialEntries: ["/"],
      Routes: <Route path="/" element={<LoginModal onClose={onCloseMock} />} />,
    });

    await user.type(await findByLabelText("Email"), "user@example.com");
    await user.type(await findByLabelText("Password"), "correctPassword");
    await user.click(await findBtn("Login"));

    expect(findId("LoginModal"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
