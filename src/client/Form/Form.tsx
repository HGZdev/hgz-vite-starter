import React, {ReactNode} from "react";
import {
  Field,
  ErrorMessage,
  FieldValidator,
  FormikConfig,
  Formik,
  Form,
  FormikValues,
} from "formik";
import {TextField, Typography} from "@mui/material";

// Define types for the InputField props
interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  validate?: FieldValidator;
  autoComplete?: string;
}

export const InputField: React.FC<InputFieldProps> = ({name, ...props}) => {
  return (
    <>
      <Field
        name={name}
        as={TextField}
        {...props}
        variant="outlined"
        margin="normal"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Typography component="div" variant="caption" color="error">
        <ErrorMessage name={name} />
      </Typography>
    </>
  );
};

interface FormikFormProps<T> extends Omit<FormikConfig<T>, "component"> {
  children: ReactNode;
}

// Create the FormikForm component
export const FormikForm = <T extends FormikValues>({
  children,
  ...props
}: FormikFormProps<T>) => (
  <Formik {...props}>
    <Form>{children}</Form>
  </Formik>
);
