import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <SearchContext.Provider value={{ isFocus, setIsFocus }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  return useContext(SearchContext);
};
