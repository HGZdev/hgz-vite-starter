import React from "react";
import * as Yup from "yup";

import {useCheckUserExists, useSaveUser} from "../../../_server/queries";
import {Link, useNavigate} from "react-router-dom";
import {ButtonPrimary, ButtonSecondary} from "../../Components/Buttons";
import {
  FormikForm,
  SelectInputField,
  TextInputField,
} from "../../Components/Form";

// Define validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long"
    ),
  confirmPassword: Yup.string()
    .required("Passwords must be confirmed")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.number().required("Gender is required"),
});

// Define types for user data
interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender?: number;
}

// Define the RegistrationForm component
const RegistrationForm: React.FC = () => {
  const [checkUserExists] = useCheckUserExists();
  const [saveUser] = useSaveUser();
  const navigate = useNavigate();

  // Define the type for the function used in validate prop
  const checkUserExistsAsync: (
    email: string
  ) => Promise<string | undefined> = async (email: string) => {
    try {
      if (email) {
        const {data} = await checkUserExists({email});
        if (data?.checkUserExists) {
          return "User with this email already exists";
        }
      }
    } catch (error) {
      console.error("Error during user existence check:", error);
    }
    return undefined;
  };

  return (
    <FormikForm<UserData>
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await saveUser(values);
          navigate("/");
        } catch (error) {
          console.error("Error during registration:", error);
        }
      }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-2 ">
        <TextInputField
          label="Email"
          name="email"
          type="email"
          validate={checkUserExistsAsync}
          autoComplete="email"
          aria-label="Email Input"
        />
        <TextInputField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          aria-label="Password Input"
        />
        <TextInputField
          label="ConfirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-label="Confirm Password Input"
        />
        <TextInputField
          label="First name"
          name="firstName"
          type="text"
          autoComplete="given-name"
          aria-label="First Name Input"
        />
        <TextInputField
          label="Last name"
          name="lastName"
          type="text"
          autoComplete="family-name"
          aria-label="Last Name Input"
        />
        <SelectInputField
          label="gender"
          name="gender"
          autoComplete="gender"
          aria-label="gender"
          options={[
            {value: undefined, label: ""},
            {value: 1, label: "female"},
            {value: 2, label: "male"},
          ]}
        />
      </div>

      <div className="flex justify-end">
        <ButtonPrimary type="submit" aria-label="Register Button">
          Register
        </ButtonPrimary>
      </div>
    </FormikForm>
  );
};

const Registration = () => {
  return (
    <div data-testid="Registration" className="flex justify-center">
      <div className="flex flex-col gap-4 p-4 w-full max-w-screen-lg">
        <div>
          <Link to="/">
            <ButtonSecondary aria-label="Back Button" className="btn-outline">
              Back
            </ButtonSecondary>
          </Link>
        </div>
        <h2 className="text-center text-2xl mb-4">Registration</h2>
        <div className="flex flex-col gap-4">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Registration;
