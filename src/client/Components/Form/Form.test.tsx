import {render, screen, waitFor} from "@testing-library/react";
import userEvent, {type UserEvent} from "@testing-library/user-event";
import {beforeEach, describe, expect, test, vi} from "vitest";
import {FormikForm, SelectInputField, TextInputField} from ".";
import * as Yup from "yup";

describe("FormikForm Component Tests", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });
  test("renders and submits the FormikForm component with TextInputField", async () => {
    const handleSubmit = vi.fn();
    interface UserData {
      firstName: string;
      lastName: string;
      gender?: number;
    }

    const initialValues = {firstName: "", lastName: "", gender: undefined};

    render(
      <FormikForm<UserData>
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <TextInputField label="First Name" name="firstName" type="text" />
        <TextInputField label="Last Name" name="lastName" type="text" />
        <SelectInputField
          label="gender"
          name="gender"
          type="select"
          options={[
            {value: undefined, label: ""},
            {value: 1, label: "female"},
            {value: 2, label: "male"},
          ]}
        />
        <button type="submit">Submit</button>
      </FormikForm>
    );

    await user.type(screen.getByLabelText(/First Name/i), "John");
    await user.type(screen.getByLabelText(/Last Name/i), "Doe");
    await user.selectOptions(screen.getByLabelText(/gender/i), "female");
    await user.click(screen.getByRole("button", {name: /submit/i}));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      const [submittedValues] = handleSubmit.mock.calls[0];
      expect(submittedValues).toEqual({
        firstName: "John",
        lastName: "Doe",
        gender: "1",
      });
    });
  });

  test("renders and handles errors in the FormikForm component with TextInputField", async () => {
    const handleSubmit = vi.fn();
    interface UserData {
      firstName: string;
      lastName: string;
      gender?: number;
    }
    const initialValues = {
      firstName: "",
      lastName: "",
      gender: undefined,
    };
    // Define Yup schema for validation
    const validationSchema = Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      gender: Yup.number().required("Gender is required"),
    });

    render(
      <FormikForm<UserData>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <TextInputField label="First Name" name="firstName" type="text" />
        <TextInputField label="Last Name" name="lastName" type="text" />
        <SelectInputField
          label="gender"
          name="gender"
          type="select"
          options={[
            {value: undefined, label: ""},
            {value: 1, label: "female"},
            {value: 2, label: "male"},
          ]}
        />
        <button type="submit">Submit</button>
      </FormikForm>
    );

    // Simulate error by not providing a value for the required fields
    await user.click(screen.getByRole("button", {name: /submit/i}));

    await waitFor(() => {
      // Ensure handleSubmit is not called since there are errors
      expect(handleSubmit).not.toHaveBeenCalled();

      // Check for error messages
      expect(screen.getByText(/First Name is required/)).toBeTruthy();
      expect(screen.getByText(/Last Name is required/)).toBeTruthy();
      expect(screen.getByText(/Gender is required/)).toBeTruthy();
    });
  });
});
