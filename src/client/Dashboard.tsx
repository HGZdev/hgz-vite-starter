import {Button, Typography, Container} from "@mui/material";
import {useGetUserMe, useLogout} from "../_server/queries";
import Counter from "./Counter";
import styled from "styled-components";

const FlexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
`;

const LogoutButton = styled(Button)`
  align-self: flex-end;
  margin-top: 20px;
`;

const Dashboard = () => {
  const {loading, error, data} = useGetUserMe();
  const [logout] = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  if (!data && loading)
    return (
      <FlexContainer aria-busy="true" aria-live="polite">
        Loading...
      </FlexContainer>
    );
  if (error)
    return (
      <FlexContainer aria-live="assertive">
        Error: {error.message}
      </FlexContainer>
    );

  return (
    <FlexContainer>
      <LogoutButton
        variant="contained"
        color="primary"
        onClick={handleLogout}
        aria-label="Logout Button"
      >
        Logout
      </LogoutButton>
      <div>
        <Title variant="h4">Welcome to the Dashboard!</Title>
        <Counter />
      </div>
    </FlexContainer>
  );
};

export default Dashboard;
