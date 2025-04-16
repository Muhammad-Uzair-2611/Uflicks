import React, { useEffect, useState } from "react";
import {
  topRatedMovies,
  topRatedTvShows,
  getImageURL,
  getFliteredMovies,
} from "../services/movie_api";
import { useSearch } from "../Context/Searchcontext";
import { motion, AnimatePresence } from "framer-motion";

const Movie_Sugesstions = () => {
  //*States
  const [ImageURL, setImageURL] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchItem, searchResult, filter } = useSearch();
  const [currentResult, setCurrentResult] = useState([]
  );

  //*Effects
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const imageURl = await getImageURL();
        setImageURL(imageURl);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching top rated content:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        const movies = await getFliteredMovies(
          filter.id ? filter.id : "28,12,878"
        );
        setCurrentResult(movies);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    }

    fetchMovies();
  }, [filter]); // Re-run the effect when `filter` changes

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const loadingVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const noMatchVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
      y: 20,
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.2,
      },
    },
  };

  const noMatchItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          variants={loadingVariants}
          animate="animate"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <motion.p
            className="text-xl text-gray-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <motion.div
          className="bg-neutral-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-neutral-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-red-500 text-2xl">⚠️</div>
            <h2 className="text-2xl font-bold text-red-500">
              Error Loading Content
            </h2>
          </div>
          <p className="text-gray-400 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mt-10 ">
      <motion.div
        className="sm:text-3xl text-xl sm:mb-5 mb-3 sm:px-4 px-2 font-semibold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {searchItem === ""
          ? `${filter.name ? `${filter.name}` : `Discover:`}`
          : `Search Results: ${searchResult.length}`}
      </motion.div>
      <motion.div
        className={`sm:px-4 px-2 mb-2 sm:gap-y-8 gap-y-8 gap-x-4 sm:block ${
          currentResult.length > 0 && "grid grid-cols-3"
        } `}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {currentResult.length > 0 ? (
            currentResult.map((movie) =>
              movie.poster != null && movie.overview !== "" ? (
                <motion.div
                  key={movie.id}
                  className="sm:bg-neutral-900 bg-none sm:w-full w-fit flex sm:mb-3 mb-0 sm:py-2 p-0 sm:px-3 sm:gap-x-3 rounded-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="md:min-w-30 md:w-30 md:h-45 sm:min-w-28 sm:w-28 sm:h-40 w-25 h-37 overflow-hidden rounded-lg cursor-pointer bg-no-repeat bg-cover shadow-sm shadow-gray-500">
                    <img
                      loading="lazy"
                      src={`${ImageURL.url}${ImageURL.sizes[1]}${movie.poster}`}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <div className="mb-4">
                      <div className="font-semibold md:text-xl sm:text-lg hidden sm:block mb-2">
                        {movie.title}
                      </div>
                      <span className="md:text-[16px] sm:text-sm hidden sm:block text-neutral-300">
                        {movie.release_date}
                      </span>
                    </div>
                    <p className="md:text-sm sm:text-xs sm:block hidden">
                      {movie.overview}
                    </p>
                  </div>
                </motion.div>
              ) : null
            )
          ) : (
            <motion.div
              className="min-h-[50vh] w-full  flex flex-col items-center justify-center gap-6 p-4"
              variants={noMatchVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className=" text-8xl sm:text-9xl mb-4"
                variants={noMatchItemVariants}
                animate={{
                  rotate: [0, 10, -10, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                🔍
              </motion.div>
              <motion.div
                className="text-center"
                variants={noMatchItemVariants}
              >
                <h2 className=" text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  No Results Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-center">
                  Try different keywords or check your spelling
                </p>
              </motion.div>
              <motion.div
                className="flex gap-4 mt-4"
                variants={noMatchItemVariants}
              ></motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Movie_Sugesstions;
