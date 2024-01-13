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

const makeValidation = ({
  value = undefined,
  validators = defaultValidators,
  validate = [],
  required,
}: FieldValidationProps) => {
  let fieldError;

  const rules = required ? [...(validate || []), "required"] : validate;

  for (const rule of rules || []) {
    const validationError = validators[rule](value) ?? undefined;
    fieldError = validationError;
    if (validationError) break;
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
  value,
  onChange,
  onBlur,
  required,
  validate,
  label = id,
  ariaLabel = label || id,
  autoComplete,
}) => {
  const [fieldError, setFieldError] = useState<string>();

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setFieldError(
      makeValidation({
        value: e.target.value,
        validate,
        required,
      })
    );
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFieldError(
      makeValidation({
        value: e.target.value,
        validate,
        required,
      })
    );
    onBlur?.(e);
  };

  return (
    <>
      <Label htmlFor={id}>{label}:</Label>
      <StyledInput
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
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
  initialValues?: Record<string, InputValue>;
}

// Form Component
export const Form: FC<FormProps> = ({
  children,
  onSubmit,
  onError,
  showSubmitButton,
  initialValues,
}) => {
  const [formValues, setFormValues] = useState<Record<string, InputValue>>({});

  useEffect(() => {
    console.log("initialValues:", initialValues);
    if (initialValues) setFormValues(initialValues);
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for field validation errors
    const validationErrors: Record<string, string | undefined> = {};
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Input) {
        const {id, validate, required} = child.props as InputProps;
        validationErrors[id] = makeValidation({
          value: formValues[id],
          validate,
          required,
        });
      }
    });

    if (Object.values(validationErrors).length > 0) {
      return;
    }

    try {
      // If validation passes, submit the form
      onSubmit(formValues);
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
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Input) {
            const {id} = child.props as InputProps;

            const newInputProps: Partial<InputProps> = {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(id, e.target.value),
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                handleInputChange(id, e.target.value);
              },
            };

            return React.cloneElement(child, {
              ...child.props,
              ...newInputProps,
            });
          }
          return child;
        })}
        {showSubmitButton && <button type="submit">Submit</button>}
      </StyledForm>
      <>{JSON.stringify(formValues)}</>
    </FormContainer>
  );
};
