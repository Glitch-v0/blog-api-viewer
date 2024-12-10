import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import AddComment from "../components/AddComment";
import { loadComments } from "../utils/commentMethods";
import { formatDate } from "../utils/stringMethods";
import VotesContainer from "../components/VotesContainer";

export default function PostPage() {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [loadPostError, setError] = useState(null);

  //Get comments
  useEffect(() => {
    loadComments(postId, setComments, setPost, setError);
  }, [postId]);

  return (
    <div>
      <NavBar />
      <header>
        <h1>{post.title}</h1>
        <h2>
          <i>{post.content}</i>
        </h2>
        <h3>Date: {`${formatDate(post.date)}`}</h3>
      </header>
      <AddComment
        loadComments={loadComments}
        setComments={setComments}
        setPost={setPost}
        setError={setError}
      />
      {loadPostError ? (
        <h2>Error: {loadPostError.message || "Failed to load."}</h2>
      ) : !comments.length ? (
        <h2>There are no comments for this post yet.</h2>
      ) : (
        <div className="commentsContainer">
          <h1>Comments</h1>
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <h2>{comment.user.username}</h2>
              <h3>
                <i>&ldquo;{comment.content}&rdquo;</i>
              </h3>

              <h3>Date: {`${formatDate(comment.date)}`}</h3>
              <VotesContainer
                votes={comment.votes}
                userVote={comment.userVote}
                commentId={comment.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
