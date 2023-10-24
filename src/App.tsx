import React from "react";
import {useQuery, useMutation, QueryResult} from "@apollo/client";
import {gql} from "graphql-tag";
import "./App.css";

interface CounterData {
  counter: number;
}

export const GET_COUNTER = gql`
  query counter {
    counter
  }
`;

export const INCREMENT_COUNTER = gql`
  mutation incrementCounter {
    incrementCounter
  }
`;

const App: React.FC = () => {
  const {loading, error, data, refetch}: QueryResult<CounterData> =
    useQuery(GET_COUNTER);
  const [incrementCounter] = useMutation(INCREMENT_COUNTER);

  if (loading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = error as Error;
    return <p>Error: {errorMessage.message}</p>;
  }

  const counter: number = data?.counter ?? 0;

  const handleIncrement = async () => {
    try {
      await incrementCounter();
      refetch(); // Manually refetch the counter value after the increment
    } catch (error) {
      const errorMessage = error as Error;
      console.error("Error incrementing counter:", errorMessage.message);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Counter App</h1>
        <p className="counter-text">Counter: {counter}</p>
        <button className="increment-button" onClick={handleIncrement}>
          Increment
        </button>
      </div>
    </div>
  );
};

export default App;
