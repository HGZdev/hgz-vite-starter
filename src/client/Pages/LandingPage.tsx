// LandingPage.tsx

import React, {useState} from "react";
import LoginModal from "../Modals/LoginModal";
import Dashboard from "./Dashboard";
import FancyAvatar from "../Avatar";
// import Snowfall from "react-snowfall";
import {useGetUserMe} from "../../_server/queries";
import {useNavigate} from "react-router-dom";

// const LandingPageContainer =
//   "bg-gradient-to-b from-sky-blue to-steel-blue flex flex-col items-center justify-center h-screen";

// const Title = "text-black text-2.5xl text-center mb-4";

// const ButtonContainer = "flex flex-row items-center gap-4 mt-4";

// const ButtonPrimary = "bg-primary text-black px-4 py-2 rounded";
// const ButtonSecondary = "bg-secondary text-white px-4 py-2 rounded";

// const CircularProgressStyled = "text-white";

const LandingPage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const {data, loading, error} = useGetUserMe();
  const navigate = useNavigate();

  if (!data && loading)
    return (
      <div data-testid="loading" className="" aria-label="loading">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const getUserMe = data?.getUserMe;

  const openLoginModal = () => setShowLoginModal(true);

  return (
    <div data-testid="LandingPage" className="">
      {!getUserMe ? (
        <>
          <FancyAvatar />
          {/* <Snowfall /> */}
          <div className="">Welcome to My Awesome Starter! ☕️</div>
          <div className="">Explore, Learn, and Enjoy Your Stay!</div>
          <div className="">
            <button
              className=""
              onClick={() => navigate("/registration")}
              aria-label="Register"
            >
              Register
            </button>
            <button className="" onClick={openLoginModal} aria-label="Login">
              Login
            </button>
          </div>
        </>
      ) : (
        <Dashboard />
      )}
      {showLoginModal && (
        <LoginModal
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;
