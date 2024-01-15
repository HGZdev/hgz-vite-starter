import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const msg = error instanceof Error && error.message;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{msg}</i>
      </p>
    </div>
  );
}
