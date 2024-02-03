import React from "react";

const Loading: React.FC = () => {
  return (
    <span
      data-testid="loading"
      aria-label="loading"
      className="loading loading-spinner loading-lg"
    ></span>
  );
};

export default Loading;
