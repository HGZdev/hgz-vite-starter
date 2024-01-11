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

const handleFieldValidation = ({
  fieldId,
  fieldValue,
  validators = defaultValidators,
  validate?,
  required?,
}: {
  fieldId: string,
  fieldValue: string,
  validators: Validators,
  validate?: string[],
  required?: boolean // Include the required prop

} )=> {
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

  // Update the field errors state
  setFieldErrors((prevState) => ({
    ...prevState,
    [fieldId]: fieldError || "", // Store the error message or an empty string if no error
  }));
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
  const [fieldError, setFieldError] = useState();
  const handleBlur = (e) => {
    const err = handleFieldValidation(id, value, validate, required);

    onBlur?.(e);
  };

  return (
    <>
      <Label htmlFor={id}>{label}:</Label>
      <StyledInput
        type={type}
        id={id}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        onBlur={handleBlur}
        aria-label={ariaLabel}
        required={required}
      />
      {/* <ErrorLabel>{fieldError}</ErrorLabel> */}
    </>
  );
};

// Form Component
export const Form: FC<FormProps> = ({onSubmit, children}) => {
  // State to track validation status of each field
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate all input fields
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Input) {
        const childProps = child.props as InputProps;
        if (childProps && childProps.id) {
          handleFieldValidation(
            childProps.id,
            childProps.value,
            childProps.validate,
            childProps.required
          );
        }
      }
    });

    // Check if any field has validation errors
    const hasErrors = Object.values(fieldErrors).some((error) => {
      return error !== "";
    });

    // If there are no errors, call the onSubmit function
    if (!hasErrors) {
      onSubmit(e);
    }
  };

  // Recursive function to clone children and pass additional props
  const renderChildren = (children: ReactNode): ReactNode =>
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // Check if the child is an Input component
        if (child.type === Input) {
          const childProps = child.props as InputProps;
          if (childProps && childProps.id) {
            // If it's an Input component, pass additional props for validation
            return React.cloneElement(child, {
              // onBlur: () =>
              //   handleFieldValidation(
              //     childProps.id,
              //     childProps.value,
              //     childProps.validate
              //   ),
              // fieldError: fieldErrors[childProps.id] || "",
            });
          }
        }
      }
      // If it's not an Input component, continue to render its children
      if (React.isValidElement(child)) {
        const childElement = child as React.ReactElement;
        return React.cloneElement(childElement, {
          children: renderChildren(childElement.props.children),
        });
      }
      return child;
    });

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        {/* Render children with additional props */}
        {renderChildren(children)}
      </StyledForm>
    </FormContainer>
  );
};
