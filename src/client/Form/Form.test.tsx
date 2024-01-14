import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {expect, test, vi} from "vitest";
import {FormikForm, InputField} from "./Form";
import * as Yup from "yup";

test("renders and submits the FormikForm component with InputField", async () => {
  const handleSubmit = vi.fn();
  interface UserData {
    firstName: string;
    lastName: string;
  }

  const initialValues = {firstName: "", lastName: ""};

  render(
    <FormikForm<UserData> onSubmit={handleSubmit} initialValues={initialValues}>
      <InputField label="First Name" name="firstName" type="text" />
      <InputField label="Last Name" name="lastName" type="text" />
      <button type="submit">Submit</button>
    </FormikForm>
  );

  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/First Name/i), "John");
  await user.type(screen.getByLabelText(/Last Name/i), "Doe");
  await user.click(screen.getByRole("button", {name: /submit/i}));

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    const [submittedValues] = handleSubmit.mock.calls[0];
    expect(submittedValues).toEqual({
      firstName: "John",
      lastName: "Doe",
    });
  });
});

test("renders and handles errors in the FormikForm component with InputField", async () => {
  const handleSubmit = vi.fn();
  interface UserData {
    firstName: string;
    lastName: string;
  }
  const initialValues = {
    firstName: "",
    lastName: "",
  };
  // Define Yup schema for validation
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
  });

  render(
    <FormikForm<UserData>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <InputField label="First Name" name="firstName" type="text" />
      <InputField label="Last Name" name="lastName" type="text" />
      <button type="submit">Submit</button>
    </FormikForm>
  );

  const user = userEvent.setup();

  // Simulate error by not providing a value for the required fields
  await user.click(screen.getByRole("button", {name: /submit/i}));

  await waitFor(() => {
    // Ensure handleSubmit is not called since there are errors
    expect(handleSubmit).not.toHaveBeenCalled();

    // Check for error messages
    expect(screen.getByText(/First Name is required/)).toBeTruthy();
    expect(screen.getByText(/Last Name is required/)).toBeTruthy();
  });
});
