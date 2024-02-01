import {useGetUserMe, useLogout} from "../../_server/queries";
import Counter from "../Counter";

const FlexContainer = "flex flex-col items-center h-screen";

const Title = "mb-8 text-2xl";

const LogoutButton = "self-end mt-4 bg-primary text-white px-4 py-2 rounded";

const Dashboard = () => {
  const {loading, error, data} = useGetUserMe();
  const [logout] = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  if (!data && loading)
    return (
      <div
        className={`${FlexContainer} text-center`}
        aria-busy="true"
        aria-live="polite"
      >
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={`${FlexContainer} text-center`} aria-live="assertive">
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className={FlexContainer} data-testid="Dashboard">
      <button
        className={LogoutButton}
        onClick={handleLogout}
        aria-label="Logout Button"
      >
        Logout
      </button>
      <div className="mt-4">
        <h4 className={Title}>Welcome {data?.getUserMe.firstName}!</h4>
        <Counter />
      </div>
    </div>
  );
};

export default Dashboard;
