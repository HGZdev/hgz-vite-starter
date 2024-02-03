// Root.test.tsx
import {screen} from "@testing-library/react";
import userEvent, {type UserEvent} from "@testing-library/user-event";
import {beforeEach, describe, expect, test} from "vitest";
import {mockServer} from "../tests/vitestSetup";
import {
  counterIncrementingRes,
  getUserMeLoggedInRes,
  getUserMeNotLoggedInRes,
} from "../tests/graphqlHandlers";
import {renderMockRoot} from "../tests/testing-library/Components";
import {findBtn, findId, findText} from "../tests/testing-library/helpers";

describe("Root Component Tests", () => {
  describe("User is logged-out", () => {
    let user: UserEvent;
    beforeEach(() => {
      user = userEvent.setup();
      mockServer.use(getUserMeNotLoggedInRes, ...counterIncrementingRes);
    });
    test('renders LandingPage page when path is "/"', async () => {
      const {
        render: {container},
      } = renderMockRoot();

      expect(await findId("LandingPage"));
      expect(await findBtn(/Register/i));
      expect(await findBtn(/Login/i));
      expect(container).toMatchSnapshot();
    });

    test('renders registration page when navigating to "/registration"', async () => {
      renderMockRoot({initialEntries: ["/registration"]});
      expect(await findId("Registration"));
      expect(await findBtn(/Register/i));
    });

    test("navigates to registration page when clicking Register button", async () => {
      const {router} = renderMockRoot({initialEntries: ["/"]});

      expect(await findBtn(/Register/i));
      await user.click(await findBtn(/Register/i));

      expect(await findId("Registration"));
      expect(await findBtn(/Register/i));

      expect(router.state.location.pathname).toEqual("/registration");
    });

    test("renders error page for 404 not found", async () => {
      // Render the component with a non-existent route
      const {router} = renderMockRoot({initialEntries: ["/nonexistent"]});

      expect(router.state.location.pathname).toEqual("/nonexistent");
      expect(await findId("error-page"));
      expect(await findText(/404/i));
    });
  });

  describe("User is logged-in", () => {
    beforeEach(() => {
      mockServer.use(getUserMeLoggedInRes, ...counterIncrementingRes);
    });
    test('renders dashboard page when path is "/dashboard"', async () => {
      renderMockRoot({initialEntries: ["/dashboard"]});

      expect(screen.getByTestId("loading"));

      expect(await findId("Dashboard"));
      expect(await findId("Navbar"));
      expect((await screen.findAllByText(/Logout/i)).length).toEqual(2);
    });
  });
});
