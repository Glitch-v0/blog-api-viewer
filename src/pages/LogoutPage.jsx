import NavBar from "../components/NavBar";

export default function LogoutPage() {
  return (
    <>
      <NavBar />
      <h1>You are logged out.</h1>
      {localStorage.removeItem("token")}
    </>
    /*************  ✨ Codeium Command ⭐  *************/
    /******  abce66a9-c157-4551-b18c-c7557036297f  *******/
  );
}
