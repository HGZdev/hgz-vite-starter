// LandingPage.tsx

import React, {useState} from "react";
import {Button, CircularProgress, Typography} from "@mui/material";
import {useGetUserMe} from "../../_server/queries";
import LoginModal from "../Modals/LoginModal";
import Dashboard from "./Dashboard";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import FancyAvatar from "../Avatar";
import Snowfall from "react-snowfall";

const LandingPageContainer = styled("div")`
  background: linear-gradient(to bottom, #87cefa, #4f94cd);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled(Typography)`
  font-size: 2.5em;
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

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
          <FancyAvatar />
          <Snowfall />
          <Title variant="h2">Welcome to My Awesome Starter! ☕️</Title>
          <Typography color="white" variant="body1" paragraph>
            Explore, Learn, and Enjoy Your Stay!
          </Typography>
          <ButtonContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/registration")}
              aria-label="Register"
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowLoginModal(true)}
              aria-label="Login"
            >
              Login
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <Dashboard />
      )}
    </LandingPageContainer>
  );
};

export default LandingPage;
