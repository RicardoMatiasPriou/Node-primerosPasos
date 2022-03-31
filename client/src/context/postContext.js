import { useState, useContext, createContext, useEffect } from "react";
import {
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  getPostsRequests,
} from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  ///////////
  const [posts, setPosts] = useState([]);

  ///////////
  const getPosts = async () => {
    const res = await getPostsRequests();
    setPosts(res.data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  ///////////
  const createPost = async (post) => {
    const res = await createPostRequest(post);
    setPosts([...posts, res.data]);
  };

  ///////////
  const deletePost = async (id) => {
    const res = await deletePostRequest(id);
    if (res.status === 204) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  ///////////
  const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res.data;
  };

  return (
    <postContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
