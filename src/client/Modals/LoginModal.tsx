// LoginModal.tsx
import React, {useState} from "react";
import * as Yup from "yup";
import {InputField} from "../Form/Form";
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import {useLogin} from "../../_server/queries";

// Define validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// Define types for user data
interface UserData {
  email: string;
  password: string;
}

// Define the LoginForm component
interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onClose}) => {
  const [login] = useLogin();
  const [loginError, setLoginError] = useState<string | null>(null);

  return (
    <Formik<UserData>
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const {data} = await login(values);
          const token = data?.login?.token;

          if (token) {
            onClose();
          }
        } catch (error) {
          setLoginError("Login: Something went wrong");
        }
      }}
    >
      <Form>
        <InputField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        {loginError && (
          <div data-testid="error-banner" className="text-red-500 text-sm">
            {loginError}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <Link to="/registration" className="text-primary">
            Register
          </Link>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="text-secondary hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export interface LoginModalProps {
  onClose: () => void;
  open: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({onClose, open}) => {
  return (
    <div
      data-testid="LoginModal"
      className={`fixed inset-0 flex items-center justify-center ${
        open ? "visible" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <LoginForm onClose={onClose} />
      </div>
    </div>
  );
};

export default LoginModal;
