// src/client/App.tsx
import React from "react";
import {useQuery, useMutation, QueryResult} from "@apollo/client";
import {GET_COUNTER, INCREMENT_COUNTER} from "../_server/queries/counter.ts";
import "./App.css";

interface CounterType {
  id: string;
  value: number;
}

interface CounterData {
  counter: CounterType;
}

const App: React.FC = () => {
  const {loading, error, data, refetch}: QueryResult<CounterData> =
    useQuery(GET_COUNTER);
  const [incrementCounter] = useMutation(INCREMENT_COUNTER);

  if (loading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = error as Error;
    return <p>Error: {errorMessage.message}</p>;
  }

  const counterValue: CounterType["value"] = data?.counter.value ?? 0;

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
    <div className="container" role="main">
      <div className="content">
        <h1 className="title" aria-label="Counter Application">
          Counter App
        </h1>
        <p className="counter-text" role="status" aria-live="polite">
          Counter: {counterValue}
        </p>
        <button
          className="increment-button"
          onClick={handleIncrement}
          aria-label="Increment the counter"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default App;
