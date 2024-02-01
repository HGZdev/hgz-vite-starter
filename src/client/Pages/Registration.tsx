import React from "react";
import * as Yup from "yup";
import {FormikForm, InputField} from "../Form/Form";
import {useCheckUserExists, useSaveUser} from "../../_server/queries";
import {Link, useNavigate} from "react-router-dom";

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
});

// Define types for user data
interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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
      <InputField
        label="Email"
        name="email"
        type="email"
        validate={checkUserExistsAsync}
        autoComplete="email"
        aria-label="Email Input"
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        aria-label="Password Input"
      />
      <InputField
        label="ConfirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        aria-label="Confirm Password Input"
      />
      <InputField
        label="First name"
        name="firstName"
        type="text"
        autoComplete="given-name"
        aria-label="First Name Input"
      />
      <InputField
        label="Last name"
        name="lastName"
        type="text"
        autoComplete="family-name"
        aria-label="Last Name Input"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded"
        aria-label="Register Button"
      >
        Register
      </button>
    </FormikForm>
  );
};

const Registration = () => {
  return (
    <div data-testid="Registration" className="p-4">
      <Link to="/" className="mb-4">
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          aria-label="Back Button"
        >
          Back
        </button>
      </Link>
      <h2 className="text-2xl mb-4">Registration</h2>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
