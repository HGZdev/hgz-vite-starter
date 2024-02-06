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
    <div className="max-w-xs mx-auto mt-8 p-4 border border-gray-300 rounded">
      <h4 className="text-2xl mb-4">Counter</h4>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <>
          <h5 className="text-xl mb-4">
            Current Count: {data?.getCounter.value ?? 0}
          </h5>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleIncrement}
            aria-label="Increment the counter"
          >
            Increment
          </button>
        </>
      )}
    </div>
  );
};

export default CounterContainer;
