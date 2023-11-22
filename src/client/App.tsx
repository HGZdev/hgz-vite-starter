import React, {useState} from "react";
import Counter from "./Counter";
import LoginModal from "./LoginModal";
import "./App.css";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (isLoggedIn: boolean) => {
    setIsLoggedIn(isLoggedIn);
    return isLoggedIn;
  };

  return (
    <div className="container" role="main">
      {isLoggedIn ? (
        <Counter />
      ) : (
        <LoginModal {...{onClose: handleLoginSuccess}} />
      )}
    </div>
  );
};
export default App;
