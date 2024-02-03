import {useGetUserMe} from "../../../_server/queries";
import Counter from "../../Counter";
import Loading from "../../Components/Loading";
import ErrorBanner from "../../Components/ErrorBanner";

const Dashboard = () => {
  const {loading, error, data} = useGetUserMe();

  if (!data && loading) return <Loading />;
  if (error) return <ErrorBanner error={error} />;

  return (
    <div
      className="flex flex-col items-center h-screen"
      data-testid="Dashboard"
    >
      <div className="mt-4 base-">
        <h4 className="mb-8 text-2xl text-primary ">
          Welcome {data?.getUserMe.firstName}!
        </h4>
        <Counter />
      </div>
    </div>
  );
};

export default Dashboard;
