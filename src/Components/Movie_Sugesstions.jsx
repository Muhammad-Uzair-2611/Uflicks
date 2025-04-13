import React, { useEffect, useState } from "react";
import { topRatedMovies, topRatedTvShows } from "../services/movie_api";
import { useSearch } from "../Context/Searchcontext";

const Movie_Sugesstions = () => {
  //*States
  const [top_Rated_Movies, set_Top_Rated_Movies] = useState([]);
  const [top_Rated_Shows, set_Top_Rated_Shows] = useState([]);
  const [suggested_Media, set_Suggested_Media] = useState([]);
  const { searchItem, searchResult } = useSearch();
  const currentResult = searchItem == "" ? suggested_Media : searchResult;

  //*Effects

  useEffect(() => {
    async function fetch() {
      const movies = await topRatedMovies();
      const shows = await topRatedTvShows();
      set_Top_Rated_Movies(movies);
      set_Top_Rated_Shows(shows);
    }
    fetch();
  }, []);
  useEffect(() => {
    const combined = [...top_Rated_Movies, ...top_Rated_Shows];
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    set_Suggested_Media(combined);
  }, [top_Rated_Movies, top_Rated_Shows]);

  return (
    <div className="mt-10">
      <div className="sm:text-2xl text-xl sm:mb-5 mb-3 sm:px-3 px-2 font-semibold">
        {searchItem === "" ? "Top Rated Movies & Shows" : "Search Results"}
      </div>
      <div className="sm:px-4 px-2 mb-2 sm:gap-y-8 gap-y-4 gap-x-4 sm:block grid grid-cols-3">
        {currentResult &&
          currentResult.map((movie) => (
            <div
              className="sm:bg-neutral-900 bg-none sm:w-full w-fit flex sm:mb-3 mb-0 sm:py-2 p-0 sm:px-3 sm:gap-x-3 rounded-lg"
              key={movie.id}
            >
              <div
                className=" md:min-w-30 md:w-30 md:h-45 sm:min-w-28 sm:w-28 sm:h-40 w-25 h-35 rounded-lg cursor-pointer bg-no-repeat bg-cover shadow-sm shadow-gray-500"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.poster})`,
                }}
              ></div>
              <div className="">
                <div className="mb-4">
                  <div className="font-semibold md:text-xl sm:text-lg  hidden sm:block mb-2 ">
                    {movie.title}
                  </div>
                  <span className=" md:text-[16px] sm:text-sm hidden sm:block text-neutral-300">
                    {movie.release_date}
                  </span>
                </div>
                <p className="md:text-sm sm:text-xs sm:block hidden ">
                  {movie.overview}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Movie_Sugesstions;
