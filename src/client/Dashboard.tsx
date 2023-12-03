import {useQuery} from "@apollo/client";
import {USER_ME} from "../_server/queries";

const Dashboard = () => {
  const {loading, error, data} = useQuery(USER_ME);

  if (!data && loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
    </div>
  );
};

export default Dashboard;
