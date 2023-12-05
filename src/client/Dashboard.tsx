import {useGetUserMe, useLogout} from "../_server/queries";
import {BlueButton} from "./BlueButton.tsx";
import Counter from "./Counter.tsx";
// import {destroyCookie} from "./helpers.ts";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LogoutButton = styled(BlueButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Dashboard = () => {
  const {loading, error, data} = useGetUserMe();
  const [logout] = useLogout();

  const handleLogout = async () => {
    // const {data} =
    await logout();
    // if (data?.logout) destroyCookie("token");
  };

  if (!data && loading) return <FlexBox>Loading...</FlexBox>;
  if (error) return <FlexBox>Error: {error.message}</FlexBox>;

  return (
    <FlexContainer>
      <Title>Welcome to the Dashboard!</Title>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <Counter />
    </FlexContainer>
  );
};

export default Dashboard;
