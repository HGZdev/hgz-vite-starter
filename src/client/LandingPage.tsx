import React, {useState} from "react";
import styled from "styled-components";
import {USER_ME} from "../_server/queries";
import {useQuery} from "@apollo/client";
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
  const {data, loading, error} = useQuery(USER_ME);
  const userMe = data?.userMe;
  console.log("userMe:", userMe);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (showLoginModal)
    return <LoginModal onClose={() => setShowLoginModal(false)} />;

  return (
    <LandingPageContainer>
      {!userMe ? (
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
