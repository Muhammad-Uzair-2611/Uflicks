import { useState, useCallback, createContext, useContext } from "react";

const movieInfoContext = createContext();

export function MoviesInfoProvider({ children }) {
  const [movieId, setMovieId] = useState();

  return (
    <movieInfoContext.Provider value={{ movieId, setMovieId }}>
      {children}
    </movieInfoContext.Provider>
  );
}

export const useMovieInfo = () => {
  return useContext(movieInfoContext);
};
