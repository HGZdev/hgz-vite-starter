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
        as="input" // Replaced MUI TextField with a regular input
        {...props}
        className="border p-2 w-full"
      />
      <div className="text-red-500 text-sm">
        <ErrorMessage name={name} />
      </div>
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
    <Form className="max-w-md mx-auto">{children}</Form>
  </Formik>
);
