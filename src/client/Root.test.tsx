// Root.test.js
import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect} from "vitest";
import {Root, LocationDisplay} from "./Root";
import {BrowserRouter, MemoryRouter} from "react-router-dom";

// Mock the Apollo Client queries/mutations
const mocks = [];

// Test scenarios
describe("Root Component Tests", (test) => {
  test('renders landing page when path is "/"', () => {
    render(
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );

    // Add assertions based on your application logic
    expect(screen.getByText(/You are home/i)).toBeInTheDocument();
  });

  test('renders registration page when navigating to "/registration"', () => {
    render(
      <MemoryRouter initialEntries={["/registration"]}>
        <Root />
      </MemoryRouter>
    );

    // Add assertions based on your application logic
    expect(screen.getByText(/Register Now/i)).toBeInTheDocument();
  });

  test("navigates to registration page when clicking sign up button", async () => {
    render(
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );

    // Add assertions based on your application logic
    userEvent.click(screen.getByText(/Sign Up/i));

    // Check if the URL has changed
    expect(window.location.pathname).toBe("/registration");
  });

  // Add more test scenarios as needed
});

// Additional test scenarios for LocationDisplay component
describe("LocationDisplay Component Tests", (test) => {
  test("renders correct location when using BrowserRouter", () => {
    render(
      <BrowserRouter>
        <LocationDisplay />
      </BrowserRouter>
    );

    // Add assertions based on your application logic
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
  });

  test("renders correct location when using MemoryRouter", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <LocationDisplay />
      </MemoryRouter>
    );

    // Add assertions based on your application logic
    expect(screen.getByTestId("location-display")).toHaveTextContent("/about");
  });
});
