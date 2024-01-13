import React, {
  ChangeEvent,
  FC,
  ReactNode,
  useState,
  FocusEventHandler,
  useEffect,
} from "react";
import styled from "styled-components";
import {validators as defaultValidators, Validators} from "./validators";

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

export const ErrorLabel = styled.span`
  color: red;
`;

export type InputValue = string | number | readonly string[] | undefined;

type FieldValidationProps = {
  value?: InputValue;
  validators?: Validators;
  validate?: string[];
  required?: boolean;
};

const handleFieldValidation = ({
  value = undefined,
  validators = defaultValidators,
  validate = [],
  required,
}: FieldValidationProps) => {
  let fieldError: string = "";

  // Include "required" rule if the field is required
  const rules = required ? [...(validate || []), "required"] : validate;

  for (const rule of rules || []) {
    const validationError = validators[rule](value);
    if (validationError) {
      fieldError = validationError;
      break;
    }
  }

  return fieldError;
};

interface InputProps {
  type: string;
  id: string;
  value?: InputValue;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  label?: string;
  required?: boolean;
  ariaLabel?: string;
  validate?: string[];
  autoComplete?: string;
}
// Input Component
export const Input: FC<InputProps> = ({
  type,
  id,
  value: upperValue,
  onChange,
  onBlur,
  required,
  validate,
  label = id,
  ariaLabel = label || id,
  autoComplete,
}) => {
  const [value, setValue] = useState<InputValue>();
  const [fieldError, setFieldError] = useState<string | null>(null);

  useEffect(() => {
    if (upperValue) setValue(upperValue);
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFieldError(
      handleFieldValidation({
        value,
        validate,
        required,
      })
    );
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
        autoComplete={autoComplete}
      />
      {fieldError && <ErrorLabel>{fieldError}</ErrorLabel>}
    </>
  );
};

interface FormProps {
  children: ReactNode;
  onSubmit: (values: Record<string, InputValue>) => void;
  onError?: (error: string) => void;
  showSubmitButton?: boolean;
}

// Form Component
export const Form: FC<FormProps> = ({
  children,
  onSubmit,
  onError,
  showSubmitButton,
}) => {
  const [formValues, setFormValues] = useState<Record<string, InputValue>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for field validation errors
    const validationErrors: Record<string, string> = {};
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Input) {
        const {id, validate} = child.props as InputProps;
        if (id && validate)
          validationErrors[id] = handleFieldValidation({
            value: formValues[id],
            validate,
          });
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    try {
      // If validation passes, submit the form
      onSubmit(formValues);
      setFieldErrors({});
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error.message);
      }
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));

    // // Clear field error when user starts typing
    // setFieldErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [id]: "",
    // }));
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Input) {
            const {id} = child.props as InputProps;

            const newInputProps: Partial<InputProps> = {
              value: formValues[id] || "",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(id, e.target.value),
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                handleInputChange(id, e.target.value);
              },
            };

            return React.cloneElement(child, {...child.props, newInputProps});
          }
          return child;
        })}
        {showSubmitButton && <button type="submit">Submit</button>}
      </StyledForm>
      {fieldErrors && (
        <ErrorLabel>{Object.values(fieldErrors).join("\n")}</ErrorLabel>
      )}
    </FormContainer>
  );
};
