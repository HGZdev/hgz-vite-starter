import React from "react";
import {useGetUserMe} from "../../../_server/queries";
import LoginModal from "../../Components/Modals/LoginModal";
import {useNavigate} from "react-router-dom";
import Loading from "../../Components/Loading";
import Navbar from "../../Components/Navbar";

interface PrivateRoute {
  Component: React.FC;
}

const PrivateRoute: React.FC<PrivateRoute> = ({Component}) => {
  const {data, loading, error} = useGetUserMe();
  const navigate = useNavigate();

  if (!data && loading) return <Loading />;
  if (error) return <div className="text-error">Error: {error.message}</div>;

  return data?.getUserMe ? (
    <>
      <Navbar />
      <Component />
    </>
  ) : (
    <LoginModal onClose={() => navigate("/")} />
  );
};

export default PrivateRoute;
