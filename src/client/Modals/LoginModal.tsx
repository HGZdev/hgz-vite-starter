// LoginModal.tsx
import React, {useState} from "react";
import * as Yup from "yup";
import {InputField} from "../Form/Form";
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import {useLogin} from "../../_server/queries";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box, // Import Box from @mui/material to use flexbox
} from "@mui/material";

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
          <span data-testid="error-banner">
            <Typography variant="caption" color="error">
              {loginError}
            </Typography>
          </span>
        )}
        <DialogActions>
          <Box flexGrow={1}>
            <Link to="/registration">
              <Button color="primary">Register</Button>
            </Link>
          </Box>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </DialogActions>
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
    <Dialog
      data-testid="LoginModal"
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <LoginForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
