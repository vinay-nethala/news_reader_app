import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllBookmarks } from "../hooks/useIndexedDB";

const CacheContext = createContext();

export function CacheProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    getAllBookmarks().then(setBookmarks);
  }, []);

  const addBookmark = (article) => {
    setBookmarks(prev => [...prev, article]);
  };

  const removeBookmark = (url) => {
    setBookmarks(prev => prev.filter(item => item.url !== url));
  };

  return (
    <CacheContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </CacheContext.Provider>
  );
}

export const useCache = () => useContext(CacheContext);