export async function loadPosts(setPosts, setError) {
  fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/posts`)
    .then((response) => response.json())
    .then((data) => setPosts(data))
    .catch((error) => setError(error));
}
