import React from "react";
import Counter from "./Counter";
import LoginModal from "./LoginModal";

const App: React.FC = () => {
  const isLoggedIn = false;
  return <>{isLoggedIn ? <Counter /> : <LoginModal />}</>;
};
export default App;
