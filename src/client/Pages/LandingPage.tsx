import React, {useState} from "react";
import {Button, CircularProgress, Typography, Avatar} from "@mui/material";
import {useGetUserMe} from "../../_server/queries";
import LoginModal from "../Modals/LoginModal";
import Dashboard from "./Dashboard";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

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
  const navigate = useNavigate();

  if (!data && loading)
    return <CircularProgress data-testid="loading" aria-label="loading" />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const getUserMe = data?.getUserMe;
  if (showLoginModal) {
    return (
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    );
  }
  return (
    <LandingPageContainer data-testid="LandingPage">
      {!getUserMe ? (
        <>
          <Avatar
            alt="Favicon"
            src="/../assets/favicon.ico"
            sx={{width: 250, height: 250}}
          />
          <Typography>Welcome!</Typography>
          <ButtonContainer>
            <SignupButton
              variant="contained"
              color="primary"
              onClick={() => navigate("/registration")}
              aria-label="Register"
            >
              Register
            </SignupButton>
            <LoginButton
              variant="contained"
              color="secondary"
              onClick={() => setShowLoginModal(true)}
              aria-label="Login"
            >
              Login
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
