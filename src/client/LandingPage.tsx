import React, {useState} from "react";
import {Button, CircularProgress, Typography, Avatar} from "@mui/material";
import {useGetUserMe} from "../_server/queries";
import LoginModal from "./LoginModal";
import Dashboard from "./Dashboard";
import styled from "styled-components";

const LandingPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ButtonContainer = styled("div")`
  display: flex;
  flex-direction: row; /* Change this line to set buttons in one line */
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const SignupButton = styled(Button)``;
const LoginButton = styled(Button)``;

const LandingPage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {data, loading, error} = useGetUserMe();

  if (!data && loading) return <CircularProgress aria-label="Loading" />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const getUserMe = data?.getUserMe;

  if (showLoginModal)
    return (
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    );

  return (
    <LandingPageContainer>
      {!getUserMe ? (
        <>
          <Avatar
            alt="Favicon"
            src="/../assets/favicon.ico"
            sx={{width: 250, height: 250}}
          />

          <ButtonContainer>
            <SignupButton
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = "/registration")}
              aria-label="Sign up"
            >
              Sign up
            </SignupButton>
            <LoginButton
              variant="contained"
              color="secondary"
              onClick={() => setShowLoginModal(true)}
              aria-label="Log in"
            >
              Log in
            </LoginButton>
          </ButtonContainer>
        </>
      ) : (
        <Dashboard />
      )}
    </LandingPageContainer>
  );
};

export default LandingPage;
