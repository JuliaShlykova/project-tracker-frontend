import { Navigate, useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  if (error.message === 'Network Error'||error.statusText === 'Network Error') {
    return <Navigate to="/server-error" replace={true} />
  }

  return (
    <div id="error-page" className="m-0 p-2">
      <h1>{error.response?.status || error.status}</h1>
      <p>Sorry, an error has occurred:</p>
      <p>
        <i>{error.response?.data || error.statusText || error.message}</i>
      </p>
    </div>
  );
}