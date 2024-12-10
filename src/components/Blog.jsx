import { useState } from "react";
import PropTypes from "prop-types";
import { toTitleCase, formatDate } from "../utils/stringMethods";

export default function Blog({ post }) {
  const [title] = useState(toTitleCase(post.title));
  const [content] = useState(post.content);
  const [blogError] = useState(null);

  Blog.propTypes = {
    post: PropTypes.object,
    setPosts: PropTypes.func,
  };

  return (
    <div className="post">
      <div className="postBody">
        {blogError ? (
          <h2 className="error">Error: {blogError.message}</h2>
        ) : null}
        <h2>{title}</h2>
        <p>
          <i>&ldquo;{content}&rdquo;</i>
        </p>
      </div>

      <div className="postDetails">
        <p>Date: {formatDate(post.date)}</p>
        <a href={`blog/${post.id}`} title="View comments">
          {post.comments.length === 0
            ? "No comments"
            : `${post.comments} ${
                post.comments === 1 ? "Comment" : "Comments"
              }`}
        </a>
      </div>
    </div>
  );
}
