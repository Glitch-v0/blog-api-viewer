export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function checkTokenExpiration() {
  const token = getToken();
  if (!token) {
    throw new Error("Must log in to create post.");
  }
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();
  return expirationTime > currentTime;
}

export async function register(email, username, password) {
  console.log("Trying to log in");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      }
    );
    if (!response.ok) {
      // Extract error message if available
      const errorData = await response.json();
      console.log("Error from backend:", errorData);
      throw new Error(errorData.msg || "Registration failed");
    }

    return true;
  } catch (error) {
    console.log("Did not log in");
    throw error;
  }
}

export async function logIn(email, password, navigate) {
  console.log("Trying to log in");
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }
    );
    if (!response.ok) {
      // Extract error message if available
      const errorData = await response.json();
      console.log("Error from backend:", errorData);
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    saveToken(data.token);
    navigate("/blog");
    return console.log(data);
  } catch (error) {
    console.log("Did not log in");
    throw error;
  }
}
