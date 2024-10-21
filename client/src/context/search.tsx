/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const SearchContext: any = createContext(null);
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };

