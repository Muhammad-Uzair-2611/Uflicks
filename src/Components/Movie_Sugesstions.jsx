import React, { useEffect, useState } from "react";
import { topRatedMovies, topRatedTvShows } from "../services/movie_api";

const Movie_Sugesstions = () => {
  //*States
  const [top_Rated_Movies, set_Top_Rated_Movies] = useState([]);
  const [top_Rated_Shows, set_Top_Rated_Shows] = useState([]);
  const [suggested_Media, set_Suggested_Media] = useState([]);

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
      <div className="text-2xl mb-5 px-3 font-semibold">
        Top Rated Movies & Shows
      </div>
      <div className="px-4  gap-y-8 gap-x-4 sm:block grid grid-cols-3">
        {suggested_Media &&
          suggested_Media.map((movie) => (
            <div
              className="sm:bg-neutral-900 bg-none sm:w-full w-fit flex sm:mb-3 mb-0 sm:py-2 p-0 sm:px-3 sm:gap-x-3 rounded-lg"
              key={movie.id}
            >
              <div
                className=" md:min-w-30 md:w-30 md:h-45 sm:min-w-28 sm:w-28 sm:h-40 min-w-30 w-30 h-45 rounded-lg cursor-pointer bg-no-repeat bg-cover shadow-sm shadow-gray-500"
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
