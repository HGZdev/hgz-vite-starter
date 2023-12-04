import {useGetCounter, useIncrementCounter} from "../_server/queries";
import styled from "styled-components";

// Styled components for Counter
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

const Content = styled.div`
  text-align: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 300px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const CounterText = styled.p`
  font-size: 20px;
  color: #555;
  margin: 0;
`;

const IncrementButton = styled.button`
  background-color: #0074d9;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Counter component
const Counter = () => {
  const {loading, error, data, refetch} = useGetCounter();
  const [incrementCounter] = useIncrementCounter();

  if (loading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = error as Error;
    return <p>Error: {errorMessage.message}</p>;
  }

  const counterValue = data?.getCounter.value ?? 0;

  const handleIncrement = async () => {
    try {
      await incrementCounter();
      refetch();
    } catch (error) {
      const errorMessage = error as Error;
      console.error("Error incrementing counter:", errorMessage.message);
    }
  };

  return (
    <Container role="main">
      <Content>
        <Title aria-label="Counter Application">Counter App</Title>
        <CounterText role="status" aria-live="polite">
          Counter: {counterValue}
        </CounterText>
        <IncrementButton
          onClick={handleIncrement}
          aria-label="Increment the counter"
        >
          Increment
        </IncrementButton>
      </Content>
    </Container>
  );
};

export default Counter;
