import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError(); // Built-in hook from react-router, used to access the error information related to a route. If there is no error, it returns undefined.
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}