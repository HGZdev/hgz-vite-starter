import React, {
  FormEvent,
  ChangeEvent,
  FC,
  ReactNode,
  useState,
  FocusEventHandler,
} from "react";
import styled from "styled-components";
import {validators as defaultValidators} from "./validators";

// Styled Components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
`;

export const ErrorLabel = styled.p`
  color: red;
`;

// Prop Types
interface InputProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  label?: string;
  required?: boolean;
  ariaLabel?: string;
  validate?: string[];
}

type Validators = Record<string, (value: string) => string | null>;

interface FormProps {
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
  validators?: Validators;
}

type handleFieldValidationProps = {
  fieldValue: string;
  validators?: Validators;
  validate?: string[];
  required?: boolean;
};

const handleFieldValidation = ({
  fieldValue,
  validators = defaultValidators,
  validate,
  required,
}: handleFieldValidationProps) => {
  let fieldError: string | null = null;

  // Include "required" rule if the field is required
  const rules = required ? [...(validate || []), "required"] : validate;

  for (const rule of rules || []) {
    const validationError = validators[rule](fieldValue);
    if (validationError) {
      fieldError = validationError;
      break;
    }
  }

  return fieldError;
};

// Input Component
export const Input: FC<InputProps> = ({
  type,
  id,
  value,
  onChange,
  onBlur,
  required,
  validate,
  label = id,
  ariaLabel = label || id,
}) => {
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldErr = handleFieldValidation({
      fieldValue: value,
      validate,
      required,
    });

    setFieldError(fieldErr);
    onBlur && onBlur(e);
  };

  return (
    <>
      <Label htmlFor={id}>{label}:</Label>
      <StyledInput
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        aria-label={ariaLabel}
        required={required}
      />
      {fieldError && <ErrorLabel>{fieldError}</ErrorLabel>}
    </>
  );
};

// Form Component
export const Form: FC<FormProps> = ({onSubmit, children, ...rest}) => {
  const [fieldErrorsObj, setFieldErrorsObj] = useState<Record<string, string>>(
    {}
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate all input fields
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Input) {
        const childProps = child.props as InputProps;
        if (childProps?.id) {
          const fieldError = handleFieldValidation({
            ...rest,
            fieldValue: childProps.value,
            validate: childProps.validate,
            required: childProps.required,
          });

          setFieldErrorsObj((prevState) => ({
            ...prevState,
            [childProps.id]: fieldError || "",
          }));
        }
      }
    });

    console.log("fieldErrorsObj:", fieldErrorsObj);
    // Check if any field has validation errors
    const hasErrors = Object.values(fieldErrorsObj).some(
      (error) => error !== ""
    );
    console.log("hasErrors:", hasErrors);

    // If there are no errors, call the onSubmit function
    if (!hasErrors) {
      onSubmit(e);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>{children}</StyledForm>
    </FormContainer>
  );
};
