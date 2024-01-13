import React, {ReactNode} from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldValidator,
  FormikValues,
} from "formik";
import * as Yup from "yup";
import {useCheckUserExists, useSaveUser} from "../_server/queries";

// Define types for the InputField props
interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  validate?: FieldValidator;
}

// Define InputField component with types
const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  validate,
  ...props
}) => {
  return (
    <div>
      <label>{label}:</label>
      <Field type={type} name={name} validate={validate} {...props} />
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

// Define the FormikFormProps with a generic type argument
interface FormikFormProps<FormValues extends FormikValues> {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void> | void;
  validationSchema?: Yup.Schema;
  children?: ReactNode;
}

// Define the FormikForm component as a generic component
const FormikForm: <FormValues extends FormikValues>(
  props: FormikFormProps<FormValues>
) => React.ReactElement<FormikFormProps<FormValues>> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>{children}</Form>
    </Formik>
  );
};

// Define validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long"
    ),
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

  // Define the type for the function used in validate prop
  const checkUserExistsAsync: (
    email: string
  ) => Promise<string | undefined> = async (email: string) => {
    try {
      // Check if the user exists asynchronously
      const {data} = await checkUserExists({email});
      if (data?.checkUserExists) {
        return "User with this email already exists";
      }
    } catch (error) {
      // Handle other errors
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
          // Save the user
          await saveUser(values);
          window.location.href = "/";
        } catch (error) {
          // Handle other errors
          console.error("Error during registration:", error);
        }
      }}
    >
      <InputField
        label="Email"
        name="email"
        type="email"
        validate={checkUserExistsAsync}
      />
      <InputField label="Password" name="password" type="password" />
      <InputField label="First Name" name="firstName" type="text" />
      <InputField label="Last Name" name="lastName" type="text" />

      <div>
        <button type="submit">Register</button>
      </div>
    </FormikForm>
  );
};

export default RegistrationForm;
