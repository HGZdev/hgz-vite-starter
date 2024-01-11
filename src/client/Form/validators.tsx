const emailRegex =
  // eslint-disable-next-line no-control-regex
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/; //  It requires a password to have at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.

type Validators = Record<string, (value: string) => string | null>;

export const validators: Validators = {
  required: (v: string) =>
    !(v && v.length > 0) ? "Please enter required field(s)" : null,
  email: (v: string) =>
    !emailRegex.test(v) ? "Please enter a valid email address" : null,
  password: (v: string) =>
    !passwordRegex.test(v)
      ? "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      : null,
};
