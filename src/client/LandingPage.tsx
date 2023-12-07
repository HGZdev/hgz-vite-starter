import React, {useState} from "react";
import styled from "styled-components";
import {useGetUserMe} from "../_server/queries";
import LoginModal from "./LoginModal";
import Dashboard from "./Dashboard";

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignupButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LandingPage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {data, loading, error} = useGetUserMe();

  if (!data && loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const getUserMe = data?.getUserMe;

  if (showLoginModal)
    return <LoginModal onClose={() => setShowLoginModal(false)} />;

  return (
    <LandingPageContainer>
      {!getUserMe ? (
        <>
          <SignupButton
            aria-label="Sign up"
            onClick={() => (window.location.href = "/registration")}
          >
            Sign up
          </SignupButton>
          <LoginButton
            aria-label="Login"
            onClick={() => setShowLoginModal(true)}
          >
            Log in
          </LoginButton>
        </>
      ) : (
        <Dashboard />
      )}
    </LandingPageContainer>
  );
};

export default LandingPage;
