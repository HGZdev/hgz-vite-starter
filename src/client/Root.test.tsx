import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import {MockedProvider} from "@apollo/client/testing";
import App from "./Root";
import {getCounterGQL, incrementCounterGQL} from "../_server/queries";

const mockedValue = 5;

// Adjusting GraphQL mocks to include the `id` field and the value wrapped as `{ value: number }`
const mocks = [
  {
    request: {
      query: getCounterGQL,
    },
    result: {
      data: {counter: {id: "1", value: mockedValue}},
    },
  },
  {
    request: {
      query: incrementCounterGQL,
    },
    result: {
      data: {incrementCounter: {id: "1", value: mockedValue + 1}}, // Incremented value is also wrapped in an object
    },
  },
  {
    request: {
      query: getCounterGQL,
    },
    result: {
      data: {counter: {id: "1", value: mockedValue + 1}}, // Next fetch also provides incremented value
    },
  },
];

describe("App Component", () => {
  it("renders without crashing", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // screen.debug();

    // Check if "Loading..." text appears first
    const loadingText = screen.queryByText(/Loading.../i);
    expect(loadingText).toBeTruthy();

    // Wait for the counter to display
    const counterDisplay = await screen.findByText(
      new RegExp(`Counter: ${mockedValue}`)
    );
    expect(counterDisplay).toBeTruthy();

    // Click the increment button
    const incrementButton = screen.getByText(/Increment/i);
    fireEvent.click(incrementButton);

    // Wait for the updated counter value to display
    const updatedCounter = await screen.findByText(
      new RegExp(`Counter: ${mockedValue + 1}`)
    );
    expect(updatedCounter).toBeTruthy();
  });
});
