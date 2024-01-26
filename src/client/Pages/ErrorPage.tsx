import React from "react";
import {useRouteError} from "react-router-dom";

type ErrorResponse = {
  data: unknown;
  status: number;
  statusText: string;
  message?: string;
};

const errorCheck = (error: unknown): error is ErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    "status" in error &&
    "statusText" in error
  );
};

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  if (errorCheck(error)) {
    return (
      <div id="error-page" data-testid="error-page">
        <p>
          Oops! Error ({error.status}): {error.statusText || error.message}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default ErrorPage;
