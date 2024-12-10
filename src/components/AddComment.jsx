import { useParams } from "react-router-dom";
import propTypes from "prop-types";
import { createComment } from "../utils/commentMethods";

export default function AddComment({
  setComments,
  setPost,
  loadComments,
  setError,
}) {
  const { postId } = useParams();

  AddComment.propTypes = {
    loadComments: propTypes.func,
    setComments: propTypes.func,
    setPost: propTypes.func,
    setError: propTypes.func,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    await createComment(postId, content)
      .then(() => {
        loadComments(postId, setComments, setPost, setError);
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <div className="addComment">
      <form onSubmit={handleSubmit}>
        <h2>Create a new comment!</h2>
        <input type="text" name="content" placeholder="Comment" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
