import {useState, FormEvent, FC} from "react";
import {useCheckUserExists, useSaveUser} from "../_server/queries";
import {ErrorLabel, Input, SubmitButton, Form} from "./Form/Form";
import {validators} from "./Form/validators";

// Registration Component
const Registration: FC = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [saveUser, {loading}] = useSaveUser();
  const [checkUserExists] = useCheckUserExists();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !firstName || !lastName) {
      setError("Please enter all required fields");
      return;
    }
    const emailValidationResult = validators.email(email);
    const passwordValidationResult = validators.password(password);

    if (emailValidationResult) {
      setError(emailValidationResult);
      return;
    }

    if (passwordValidationResult) {
      setError(passwordValidationResult);
      return;
    }

    if (email) {
      const {data} = await checkUserExists({email});

      if (data?.checkUserExists) {
        setError("A user with this email already exists.");
        return;
      }
    }

    try {
      const savedUser = await saveUser({email, firstName, lastName, password});

      // Handle successful registration
      if (savedUser) {
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setError("");
        window.location.href = "/";
      }
    } catch (error) {
      // Handle registration error
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
      <Input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        required
      />
      <Input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        label="First Name"
      />
      <Input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        label="Last Name"
        required
      />
      <Input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        required
      />
      <SubmitButton type="submit" disabled={loading}>
        Register
      </SubmitButton>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Form>
  );
};

export default Registration;
