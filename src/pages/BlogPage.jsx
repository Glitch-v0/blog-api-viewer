import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Blog from "../components/Blog";
import { loadPosts } from "../utils/postMethods";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loadBlogError, setError] = useState(null);

  // Get posts
  useEffect(() => {
    loadPosts(setPosts, setError);
  }, []);

  return (
    <div>
      <NavBar />

      {loadBlogError ? (
        <h2 className="error">
          Error: {loadBlogError.message || "Failed to load blogs."}
        </h2>
      ) : null}
      {!posts.length ? (
        <h2>There are no blogs!</h2>
      ) : (
        <div className="postContainer">
          {posts.map((post) => (
            <Blog post={post} key={post.id} setPosts={setPosts} />
          ))}
        </div>
      )}
    </div>
  );
}
