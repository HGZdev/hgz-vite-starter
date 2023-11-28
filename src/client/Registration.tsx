import React, {useState, FormEvent} from "react";
import {useMutation, gql} from "@apollo/client";
import LoginModal from "./LoginModal";
import styled from "styled-components";

interface RegistrationData {
  email: string;
  password: string;
}

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

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
  const [password, setPassword] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState("");

  const [registerUser, {loading}] =
    useMutation<RegistrationData>(REGISTER_USER);

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
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
      const {data} = await registerUser({
        variables: {email, password},
      });
      // Handle successful registration
      setShowLoginModal(true);
    } catch (error) {
      // Handle registration error
      setError(error.message);
    }
  };

  return (
    <RegistrationContainer>
      <h2>Registration Form</h2>
      <RegistrationForm onSubmit={handleRegistration}>
        <RegistrationLabel htmlFor="email">Email:</RegistrationLabel>
        <RegistrationInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
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
      {showLoginModal && <LoginModal />}
    </RegistrationContainer>
  );
};

export default Registration;
