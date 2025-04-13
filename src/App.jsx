import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./Components/MovieCard";
import { FaChevronLeft } from "react-icons/fa";
import { useSearch } from "./Context/Searchcontext";
import {
  getMovies,
  getTrendingMovies,
  getTNowPlayingMovies,
  getPopularShow,
} from "./services/movie_api";
import Movie_Sugesstions from "./Components/Movie_Sugesstions";

function App() {
  //*States & Ref
  const [trendng_Movies, set_Trendng_Movies] = useState([]);
  const [now_Playing, set_Now_Playing] = useState([]);
  const [popular_TV_Show, set_Popular_TV_Show] = useState([]);
  const { isFocus } = useSearch();
  const trending_Movie_crousel = useRef(null);
  const now_Playing_crousel = useRef(null);
  const popular_Show_crousel = useRef(null);

  //*Variables
  useEffect(() => {
    console.log(popular_TV_Show);
  }, [popular_TV_Show]);

  //*Effects
  useEffect(() => {
    async function fetch() {
      let Trending_movies = await getTrendingMovies();
      let now_Playing = await getTNowPlayingMovies();
      let popular_Show = await getPopularShow();
      set_Trendng_Movies(Trending_movies);
      set_Now_Playing(now_Playing);
      set_Popular_TV_Show(popular_Show);
    }
    fetch();
  }, []);

  //*Functions
  const handleclick = async (direction, e) => {
    if (direction === "right") {
      if (e.currentTarget.id == "trending_right")
        trending_Movie_crousel.current.scrollLeft -= 200;
      else if (e.currentTarget.id == "now_playing_right")
        now_Playing_crousel.current.scrollLeft -= 200;
      else popular_Show_crousel.current.scrollLeft -= 200;
    } else if (direction === "left") {
      if (e.currentTarget.id == "trending_left")
        trending_Movie_crousel.current.scrollLeft += 200;
      else if (e.currentTarget.id == "now_playing_left")
        now_Playing_crousel.current.scrollLeft += 200;
      else popular_Show_crousel.current.scrollLeft += 200;
    }
  };

  return (
    <div className="">
      {isFocus ? (
        <Movie_Sugesstions />
      ) : (
        <>
          <div className="mt-5">
            <h1 className="sm:text-4xl text-2xl font-semibold sm:px-4 px-2">Trending</h1>
          </div>
          <div className="h-55 sm:h-fit mb-5 sm:px-4 px-0  sm:mt-10 mt-0 items-center relative">
            <div
              className="hidden sm:flex justify-start gap-x-4 items-center relative z-10 w-fit bottom-[63%] 
         [&>button]:lg:text-[40px] [&>button]:text-[30px] [&>button]:cursor-pointer"
            >
              <button
                onClick={(e) => handleclick("right", e)}
                id="trending_right"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={(e) => handleclick("left", e)}
                className="rotate-z-180"
                id="trending_left"
              >
                <FaChevronLeft />
              </button>
            </div>
            <div
              ref={trending_Movie_crousel}
              className="flex gap-x-7 overflow-x-scroll px-2 py-4 scrollbar-hide transition-all scroll-smooth"
            >
              {trendng_Movies.map((movie) => {
                return (
                  <div key={movie.id} className="">
                    <MovieCard poster={movie.poster} title={movie.title} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="">
            <h1 className="sm:text-4xl text-2xl font-semibold sm:px-4 px-2">Now Playing</h1>
          </div>
          <div className="h-55 sm:h-fit mb-5 sm:px-4 px-0 sm:mt-10 mt-0 sm:mb-10  relative">
            <div
              className="hidden sm:flex justify-
              start gap-x-4 items-center relative z-10 w-fit bottom-[63%] 
         [&>button]:lg:text-[40px] [&>button]:text-[30px] [&>button]:cursor-pointer"
            >
              <button
                onClick={(e) => handleclick("right", e)}
                id="now_playing_right"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={(e) => handleclick("left", e)}
                className="rotate-z-180"
                id="now_playing_left"
              >
                <FaChevronLeft />
              </button>
            </div>
            <div
              ref={now_Playing_crousel}
              className="flex gap-x-7 overflow-x-scroll px-2 py-4 scrollbar-hide transition-all scroll-smooth"
            >
              {now_Playing.map((movie) => {
                return (
                  <div key={movie.id} className="">
                    <MovieCard poster={movie.poster} title={movie.title} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="">
            <h1 className="sm:text-4xl text-2xl font-semibold sm:px-4 px-2">
              Popular Tv Shows
            </h1>
          </div>
          <div className="h-55 sm:h-fit mb-5 sm:px-4 px-0 sm:mt-10 mt-0 items-center relative">
            <div
              className="hidden sm:flex justify-start gap-x-4 items-center relative z-10 w-fit bottom-[63%] 
         [&>button]:lg:text-[40px] [&>button]:text-[30px] [&>button]:cursor-pointer"
            >
              <button onClick={(e) => handleclick("right", e)}>
                <FaChevronLeft />
              </button>

              <button
                onClick={(e) => handleclick("left", e)}
                className="rotate-z-180"
              >
                <FaChevronLeft />
              </button>
            </div>
            <div
              ref={popular_Show_crousel}
              className="flex gap-x-7 overflow-x-scroll px-2 py-4 scrollbar-hide transition-all scroll-smooth"
            >
              {popular_TV_Show.map((movie) => {
                return (
                  <div key={movie.id} className="">
                    <MovieCard poster={movie.poster} title={movie.title} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
