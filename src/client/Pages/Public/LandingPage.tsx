import React from "react";
import {useNavigate} from "react-router-dom";
import {ButtonPrimary, ButtonSecondary} from "../../Components/Buttons";
import {Avatar} from "../../Components/Avatar";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      data-testid="LandingPage"
      className=" flex flex-col items-center justify-center h-screen gap-4"
    >
      <Avatar />
      <h1 className="text-4xl font-sans text-center">
        Welcome to My Awesome Starter! ☕️
      </h1>
      <p className="text-2xl font-sans">Explore, Learn, and Enjoy Your Stay!</p>
      <div className="flex justify-center gap-4">
        <ButtonSecondary
          className="btn-block"
          onClick={() => navigate("/registration")}
          aria-label="Register"
        >
          Register
        </ButtonSecondary>
        <ButtonPrimary
          className="btn-block"
          onClick={() => navigate("/dashboard")}
          aria-label="Login"
        >
          Login
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default LandingPage;
