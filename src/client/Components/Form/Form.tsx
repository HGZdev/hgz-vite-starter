import {ReactNode} from "react";
import {FormikConfig, Formik, Form, FormikValues} from "formik";

interface FormikFormProps<T> extends Omit<FormikConfig<T>, "component"> {
  children: ReactNode;
}

export const FormikForm = <T extends FormikValues>({
  children,
  ...props
}: FormikFormProps<T>) => (
  <Formik {...props}>
    <Form data-theme="form">{children}</Form>
  </Formik>
);
