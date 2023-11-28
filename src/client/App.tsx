import React, {useState} from "react";
import Counter from "./Counter";
import LoginModal from "./LoginModal";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (isLoggedIn: boolean) => {
    setIsLoggedIn(isLoggedIn);
    return isLoggedIn;
  };

  return (
    <>
      {isLoggedIn ? (
        <Counter />
      ) : (
        <LoginModal {...{onClose: handleLoginSuccess}} />
      )}
    </>
  );
};
export default App;
