import { getToken } from "./authenticationMethods";

export function loadComments(postId, setComments, setPost, setError) {
  fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
      setComments(data.comments);
      const post = {
        title: data.title,
        content: data.content,
        id: data.id,
        date: data.date,
        votes: data.votes,
      };
      setPost(post);
    })
    .catch((error) => {
      console.error(error);
      setError(error);
    });
}

export async function createComment(postId, content) {
  console.log("Creating comment");
  try {
    //Check for token first
    if (!getToken()) {
      throw new Error("Must log in to create comment.");
    }

    await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ content: content }),
      }
    )
      .then((response) => response.json())
      .finally(() => {
        return true;
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function voteComment(commentId, vote, htmlMethod) {
  console.log("Voting comment");
  const convertedVoteValue = vote ? 1 : -1;
  try {
    //Check for token first
    if (!getToken()) {
      throw new Error("Must log in to vote comment.");
    }
    await fetch(
      `${
        import.meta.env.VITE_REACT_APP_BACKEND_URL
      }/comments/${commentId}/vote`,
      {
        method: htmlMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ value: convertedVoteValue }),
      }
    )
      .then((response) => response.json())
      .finally(() => {
        return true;
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
