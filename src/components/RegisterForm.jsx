import { useState } from "react";
import { register } from "../utils/authenticationMethods";

export default function RegisterForm() {
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  return (
    <form
      id="registerForm"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          setRegistrationError(null);
          const formData = new FormData(e.target);
          const email = formData.get("email");
          const username = formData.get("username");
          const password = formData.get("password");
          const success = await register(email, username, password);
          if (success) {
            setRegistrationSuccess("Registration successful.");
            setRegistrationError(null);
            e.target.reset();
          } else {
            setRegistrationSuccess(false);
          }
        } catch (error) {
          console.log("Updating error state!");
          setRegistrationError(error.message);
        }
      }}
    >
      <h2>Register</h2>

      {registrationSuccess ? (
        <p className="success">{registrationSuccess}</p>
      ) : null}
      {registrationError ? <p className="error">{registrationError}</p> : null}
      <div>
        <label>
          <h3>Email</h3>
          <input type="text" name="email" placeholder="email@address.com" />
        </label>
        <label>
          <h3>Username</h3>
          <input type="text" name="username" placeholder="username" />
        </label>
        <label>
          <h3>Password</h3>
          <input type="text" name="password" placeholder="password" />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
