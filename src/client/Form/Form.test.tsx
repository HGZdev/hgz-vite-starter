import {describe, it, expect, vi} from "vitest";
import {Form, Input, SubmitButton} from "./Form";
import {render, fireEvent} from "@testing-library/react";

// Mock function for onSubmit
const onSubmitMock = vi.fn();

// Test suite for Input component
describe("Input Component Tests", () => {
  // Test case for rendering Input component
  it("should render Input component with label", () => {
    const {container} = render(
      <Input
        type="text"
        id="username"
        value=""
        onChange={() => {}}
        label="Username"
        required
      />
    );

    // Example assertion using vitest
    expect(container.querySelector('label[for="username"]')).toBeTruthy();
  });

  // Test case for input change
  it("should call onChange when input value changes", () => {
    const onChangeMock = vi.fn();
    const {getByLabelText} = render(
      <Input
        type="text"
        id="username"
        value=""
        onChange={onChangeMock}
        label="Username"
        required
      />
    );

    const inputElement = getByLabelText("Username");
    fireEvent.change(inputElement, {target: {value: "USERNAME"}});

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({target: {value: "USERNAME"}})
    );
  });
});

// Test suite for Form component
describe("Form Component Tests", () => {
  // Test case for rendering Form component
  it("should render Form component with onSubmit handler", () => {
    const {container} = render(
      <Form onSubmit={onSubmitMock}>
        <Input
          type="text"
          id="username"
          value=""
          onChange={() => {}}
          label="Username"
          required
        />
        {/* Add other necessary children components */}
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    );

    // Example assertion using vitest
    expect(container.querySelector("form")).toBeTruthy();
  });

  // Test case for form submission
  it("should call onSubmit when the form is submitted", () => {
    const {container} = render(
      <Form onSubmit={onSubmitMock}>
        <Input
          type="text"
          id="username"
          value=""
          onChange={() => {}}
          label="Username"
          required
        />
        {/* Add other necessary children components */}
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    );

    const formElement = container.querySelector("form") as HTMLFormElement;

    fireEvent.submit(formElement);
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  // Test case for rendering Form component with children
  it("should render Form component with children", () => {
    const {getByLabelText, getByText} = render(
      <Form onSubmit={onSubmitMock}>
        <Input
          type="text"
          id="username"
          value=""
          onChange={() => {}}
          label="Username"
          required
        />
        <Input
          type="password"
          id="password"
          value=""
          onChange={() => {}}
          label="Password"
          required
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    );

    expect(getByLabelText("Username")).toBeTruthy();
    expect(getByLabelText("Password")).toBeTruthy();
    expect(getByText("Submit")).toBeTruthy();
  });

  // Test case for handling form submission with validation
  it("should not call onSubmit when form is submitted with invalid fields", () => {
    const {getByText, getByLabelText} = render(
      <Form onSubmit={onSubmitMock}>
        <Input
          type="text"
          id="username"
          value=""
          onChange={() => {}}
          label="Username"
          required
          validate={["email"]}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    );

    const formElement = getByText("Submit").closest("form") as HTMLFormElement;
    fireEvent.submit(formElement);
    // Assert that onSubmitMock has not been called
    expect(onSubmitMock).not.toHaveBeenCalled();

    const errorMessage = getByLabelText("Username").nextSibling;
    expect(errorMessage).toEqual("Please enter required field(s)");
  });
});
