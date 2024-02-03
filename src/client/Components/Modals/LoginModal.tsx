// LoginModal.tsx
import React, {useState} from "react";
import * as Yup from "yup";
import {useLogin} from "../../../_server/queries";
import {FormikForm, TextInputField} from "../Form";
import {ButtonPrimary, ButtonSecondary} from "../Buttons";
import {useNavigate} from "react-router-dom";

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
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  return (
    <FormikForm<UserData>
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
            navigate("/dashboard");
          }
        } catch (error) {
          setLoginError("Login: Something went wrong");
        }
      }}
    >
      <TextInputField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
      />
      <TextInputField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
      />
      {loginError && (
        <div data-testid="error-banner" className="text-error text-sm">
          {loginError}
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <ButtonSecondary to="/registration">Register</ButtonSecondary>
        <div className="flex gap-4">
          <ButtonSecondary onClick={onClose} className="btn-outline">
            Cancel
          </ButtonSecondary>
          <ButtonPrimary type="submit">Login</ButtonPrimary>
        </div>
      </div>
    </FormikForm>
  );
};

export interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({onClose}) => {
  return (
    <>
      <input type="checkbox" id="LoginModal" className="modal" />
      <dialog id="LoginModal" data-testid="LoginModal" className="modal" open>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Login</h3>
          <LoginForm onClose={onClose} />
        </div>
      </dialog>
    </>
  );
};

export default LoginModal;
