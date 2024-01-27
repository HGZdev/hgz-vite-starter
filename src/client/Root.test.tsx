// Root.test.tsx
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {beforeEach, describe, expect, test, vi} from "vitest";
import {mockServer} from "../tests/vitestSetup";
import {
  counterIncrementingRes,
  getUserMeLoggedInRes,
  getUserMeNotLoggedInRes,
} from "../tests/graphqlHandlers";
import {MockedRoot} from "../tests/testing-library/Components";
import {findBtn, findId, findText} from "../tests/testing-library/helpers";

describe("Root Component Tests", () => {
  describe("User is logged-out", () => {
    beforeEach(() => {
      mockServer.use(...getUserMeNotLoggedInRes, ...counterIncrementingRes);
    });
    test('renders landing page when path is "/"', async () => {
      const {container} = render(<MockedRoot />);
      expect(screen.getByTestId("loading"));

      expect(await findId("LandingPage"));
      expect(await findBtn(/Register/i));
      expect(await findBtn(/Login/i));
      expect(container).toMatchSnapshot();
    });

    test('renders registration page when navigating to "/registration"', async () => {
      render(<MockedRoot initialEntries={["/registration"]} />);
      expect(await findId("Registration"));
      expect(await findBtn(/Register/i));
    });

    test("navigates to registration page when clicking Register button", async () => {
      render(<MockedRoot initialEntries={["/"]} />);
      const user = userEvent.setup();
      expect(screen.getByTestId("loading"));

      expect(await findBtn(/Register/i));
      await user.click(await findBtn(/Register/i));

      expect(await findId("Registration"));
      expect(await findBtn(/Register/i));

      await waitFor(async () => {
        expect((await findId("location-display")).innerHTML).toEqual(
          "/registration"
        );
      });
    });

    test("renders error page for 404 not found", async () => {
      // Render the component with a non-existent route
      render(<MockedRoot initialEntries={["/nonexistent"]} />);

      // Ensure that the error page is rendered
      const errorPage = await findId(/error-page/i);
      expect(errorPage);

      // Check if the error message contains 404
      const errorMessage = await findText(/404/i);
      expect(errorMessage);
    });
  });

  describe("User is logged-in", () => {
    beforeEach(() => {
      mockServer.use(...getUserMeLoggedInRes, ...counterIncrementingRes);
    });
    test('renders dashboard page when path is "/"', async () => {
      render(<MockedRoot />);

      expect(screen.getByTestId("loading"));

      expect(await findId("Dashboard"));
      expect(await findBtn(/Logout/i));
    });
  });
});
