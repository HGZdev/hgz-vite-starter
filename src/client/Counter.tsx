import {Button, Typography, Container, CircularProgress} from "@mui/material";
import {useGetCounter, useIncrementCounter} from "../_server/queries";

const CounterContainer = () => {
  const {loading, error, data, refetch} = useGetCounter();
  const [incrementCounter] = useIncrementCounter();

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
    <Container
      component="main"
      maxWidth="xs"
      style={{
        textAlign: "center",
        marginTop: "2rem",
        padding: "1rem",
        border: "2px solid #eeeeee",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4">Counter</Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error: {error.message}</Typography>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Current Count: {data?.getCounter.value ?? 0}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleIncrement}
            aria-label="Increment the counter"
          >
            Increment
          </Button>
        </>
      )}
    </Container>
  );
};

export default CounterContainer;
