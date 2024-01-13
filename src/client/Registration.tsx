import {useState, FC} from "react";
import {
  SaveUserTVariables,
  useCheckUserExists,
  useSaveUser,
} from "../_server/queries";
import {ErrorLabel, Input, SubmitButton, Form, InputValue} from "./Form/Form";

const Registration: FC = () => {
  const [error, setError] = useState("");

  const [saveUser, {loading}] = useSaveUser();
  const [checkUserExists] = useCheckUserExists();

  const handleSubmit = async (values: Record<string, InputValue>) => {
    setError("");

    console.log("values:", values);
    // Check if user with this email already exists
    if (values.email) {
      const {data} = await checkUserExists({email: values.email as string});

      if (data?.checkUserExists) {
        setError("A user with this email already exists.");
        return;
      }
    }

    try {
      // Save user
      const savedUser = await saveUser(values as SaveUserTVariables);

      // Handle successful registration
      if (savedUser) {
        setError("");
        window.location.href = "/";
      }
    } catch (error) {
      // Handle registration error
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onError={setError}
      initialValues={{
        email: "h.gaudasinska@gmail.com",
        firstName: "Hanna",
        lastName: "Gaudasińska-Zapaśnik",
      }}
    >
      <h2>Registration Form</h2>
      <Input
        type="email"
        id="email"
        label="Email"
        required
        validate={["email"]}
        autoComplete="username"
      />
      <Input type="text" id="firstName" label="First Name" />
      <Input type="text" id="lastName" label="Last Name" required />
      <Input
        type="password"
        id="password"
        label="Password"
        required
        validate={["password"]}
        autoComplete="current-password"
      />
      <SubmitButton type="submit" disabled={loading}>
        Register
      </SubmitButton>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Form>
  );
};

export default Registration;
