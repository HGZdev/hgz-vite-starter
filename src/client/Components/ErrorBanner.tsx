import React from "react";

interface ErrorBannerProps {
  error: Error;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({error}) => {
  return (
    <div
      className="flex flex-col items-center h-screen text-center"
      aria-live="assertive"
    >
      <p>Error: {error.message}</p>
    </div>
  );
};

export default ErrorBanner;
