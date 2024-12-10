import { useState } from "react";
import { logIn } from "../utils/authenticationMethods";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  return (
    <form
      id="loginForm"
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          setLoginError(null);
          await logIn(email, password, navigate);
        } catch (error) {
          console.log("Updating error state!");
          setLoginError(error.message);
        }
      }}
    >
      <h2>Log In</h2>

      {loginError ? <p className="error">{loginError}</p> : null}

      <div>
        <label>
          <h3>Email</h3>
          <input
            type="text"
            name="email"
            placeholder="email@address.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <h3>Password</h3>
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
