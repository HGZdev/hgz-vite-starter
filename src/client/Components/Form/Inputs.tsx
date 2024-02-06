import {ErrorMessage, Field, FieldValidator} from "formik";

const LabelPanel: React.FC<{
  labelTopLeft?: string;
  labelTopCenter?: string;
  labelTopRight?: string;
}> = ({labelTopLeft, labelTopCenter, labelTopRight}) => (
  <div className="label">
    <span className="label-text">{labelTopLeft}</span>
    <span className="label-text-alt">{labelTopCenter}</span>
    <span className="label-text-alt">{labelTopRight}</span>
  </div>
);

const ErrorPanel: React.FC<{
  name: string;
  errorBottomRight?: boolean;
  errorBottomCenter?: boolean;
}> = ({name, errorBottomRight, errorBottomCenter}) => (
  <div className="label">
    <span className="label-text-alt text-error">
      {!errorBottomRight && !errorBottomCenter && <ErrorMessage name={name} />}
    </span>
    <span className="label-text-alt text-error">
      {errorBottomCenter && !errorBottomRight && <ErrorMessage name={name} />}
    </span>
    <span className="label-text-alt text-error">
      {errorBottomRight && !errorBottomCenter && <ErrorMessage name={name} />}
    </span>
  </div>
);

interface TextInputField {
  name: string;
  type: string;
  validate?: FieldValidator;
  autoComplete?: string;

  label?: string;
  labelTopCenter?: string;
  labelTopRight?: string;
  placeholder?: string;
  errorBottomCenter?: boolean;
  errorBottomRight?: boolean;
}

export const TextInputField: React.FC<TextInputField> = ({
  name,
  type = "text",
  placeholder,
  label: labelTopLeft,
  labelTopCenter,
  labelTopRight,
  errorBottomCenter,
  errorBottomRight,

  validate,
  autoComplete,
}) => {
  return (
    <label className="form-control w-full ">
      <LabelPanel {...{labelTopLeft, labelTopCenter, labelTopRight}} />
      <Field
        className="input input-bordered w-full input-sm"
        as="input"
        name={name}
        type={type}
        placeholder={placeholder}
        validate={validate}
        autoComplete={autoComplete}
      />
      <ErrorPanel {...{name, errorBottomRight, errorBottomCenter}} />
    </label>
  );
};

interface SelectInputFieldProps {
  name: string;
  type?: string;
  validate?: FieldValidator;
  autoComplete?: string;
  options: Array<{value: string | number | undefined; label: string}>;

  label?: string;
  labelTopCenter?: string;
  labelTopRight?: string;
  placeholder?: string;
  errorBottomCenter?: boolean;
  errorBottomRight?: boolean;
}

export const SelectInputField: React.FC<SelectInputFieldProps> = ({
  name,
  type = "select",
  options = [],

  placeholder,
  label: labelTopLeft,
  labelTopCenter,
  labelTopRight,
  errorBottomCenter,
  errorBottomRight,

  validate,
  autoComplete,
}) => {
  return (
    <label className="form-control w-full">
      <LabelPanel {...{labelTopLeft, labelTopCenter, labelTopRight}} />
      <Field
        className="select select-bordered w-full"
        as="select"
        name={name}
        type={type}
        placeholder={placeholder || autoComplete}
        validate={validate}
        autoComplete={autoComplete}
      >
        {options.map(({value: v, label: l}, i) => (
          <option key={i} value={v}>
            {l}
          </option>
        ))}
      </Field>
      <ErrorPanel {...{name, errorBottomRight, errorBottomCenter}} />
    </label>
  );
};
