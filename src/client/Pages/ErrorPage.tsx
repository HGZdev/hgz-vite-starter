// ErrorPage.tsx
import React from "react";
import {useRouteError, isRouteErrorResponse} from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  let message;

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        message = `${error.status}: This page doesn't exist!`;
        break;
      case 401:
        message = `${error.status}: You aren't authorized to see this. Email {error.data.hrEmail} if you feel this is a mistake.`;
        break;
      case 503:
        message = `${error.status}: Looks like our API is down`;
        break;
      case 418:
        message = `${error.status}: 🫖`;
        break;
      default:
        message = `${error.status}: Something went wrong`;
        break;
    }
  }

  if (error) message = "Something went wrong";
  if (!error) message = `404: This page doesn't exist!`;

  return <div data-testid="error-page">{message}</div>;
};

export default ErrorPage;
