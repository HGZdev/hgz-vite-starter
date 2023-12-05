import React, {useState, FormEvent} from "react";
import styled from "styled-components";
import {useSaveUser} from "../_server/queries";

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegistrationLabel = styled.label`
  margin-bottom: 0.5rem;
`;

const RegistrationInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const RegistrationButton = styled.button`
  padding: 0.5rem 1rem;
`;

const RegistrationError = styled.p`
  color: red;
`;

const Registration: React.FC = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [saveUser, {loading}] = useSaveUser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      setError("Please enter all required fields");
      return;
    }
    // Regex validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    // Regex validation for password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }
    try {
      const saved = await saveUser({email, firstName, lastName, password});

      // Handle successful registration
      if (saved) {
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
    <RegistrationContainer>
      <h2>Registration Form</h2>
      <RegistrationForm onSubmit={handleSubmit}>
        <RegistrationLabel htmlFor="email">Email:</RegistrationLabel>
        <RegistrationInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          required
        />
        <RegistrationLabel htmlFor="firstName">First Name:</RegistrationLabel>
        <RegistrationInput
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          aria-label="First Name"
          required
        />
        <RegistrationLabel htmlFor="lastName">Last Name:</RegistrationLabel>
        <RegistrationInput
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          aria-label="Last Name"
          required
        />
        <RegistrationLabel htmlFor="password">Password:</RegistrationLabel>
        <RegistrationInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          required
        />
        <RegistrationButton type="submit" disabled={loading}>
          Register
        </RegistrationButton>
      </RegistrationForm>
      {error && <RegistrationError>{error}</RegistrationError>}
    </RegistrationContainer>
  );
};

export default Registration;
