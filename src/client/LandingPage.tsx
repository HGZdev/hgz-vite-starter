import React from "react";
import styled from "styled-components";
import {IS_AUTH} from "../_server/queries";
import {useQuery} from "@apollo/client";

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
  const {data, loading, error} = useQuery(IS_AUTH);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <LandingPageContainer>
      {!data.isAuth && (
        <>
          <SignupButton
            aria-label="Sign up"
            onClick={() => (window.location.href = "/registration")}
          >
            Sign up
          </SignupButton>
          <LoginButton
            aria-label="Login"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </LoginButton>
        </>
      )}
    </LandingPageContainer>
  );
};

export default LandingPage;
