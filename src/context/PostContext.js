import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [currentPost, setCurrentPost] = useState({})
  return (
    <PostContext.Provider value={{
      currentPost,
      setCurrentPost
    }}>
      { children }
    </PostContext.Provider>
  )
}
