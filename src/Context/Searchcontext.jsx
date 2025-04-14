import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [isFocus, setIsFocus] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([""]);

  return (
    <SearchContext.Provider
      value={{
        isFocus,
        setIsFocus,
        searchItem,
        setSearchItem,
        searchResult,
        setSearchResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  return useContext(SearchContext);
};
