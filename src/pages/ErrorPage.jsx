import NavBar from "../components/NavBar";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <NavBar />
      <h1 className="error">Error: {error.statusText || error.message}</h1>
      <h2>Please go back and try again.</h2>
    </>
  );
}
