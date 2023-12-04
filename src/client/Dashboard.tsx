import {useGetUserMe, useLogout} from "../_server/queries";
import Counter from "./Counter.tsx";
import {destroyCookie} from "./helpers.ts";

const Dashboard = () => {
  const {loading, error, data} = useGetUserMe();
  const [logout] = useLogout();

  const handleLogout = () => {
    destroyCookie("token");
    logout();
  };

  if (!data && loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
      <Counter />
    </div>
  );
};

export default Dashboard;
