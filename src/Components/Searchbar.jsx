import { FaSearch, FaFilter } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { React, useState, useRef, useEffect, useCallback } from "react";
import { useSearch } from "../Context/Searchcontext";
import {
  getSearchResult,
  getMoviesGenres,
  getShowsGenres,
} from "../services/movie_api";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Searchbar = () => {
  //*States & Refrences
  const [showFilters, setShowFilters] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const {
    isFocus,
    setIsFocus,
    searchItem,
    setSearchItem,
    setSearchResult,
    setFilter,
  } = useSearch();
  const Search_Ref = useRef(null);
  const filterDivRef = useRef(null);
  const filterBtn = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const ExcludedCategories = [
    "Animation",
    "Horror",
    "Action",
    "Drama",
    "Adventure",
    "Comedy",
  ];

  //*Functionss
  const Debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const debouncedSearch = useRef(
    Debounce(async (value) => {
      let searchResult = await getSearchResult(value);
      setSearchResult(searchResult);
    }, 500)
  ).current;

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value != " ") {
      setSelectedGenre(false);
      setSearchItem(value);
      debouncedSearch(value);
    }
  };
  const handleClick = async () => {
    if (isFocus != true) {
      navigate("/search/movies");
      setSearchItem("");
      Search_Ref.current?.focus();
    } else {
      setSearchItem("");
      setIsFocus(false);
      navigate("/");
    }
  };
  const handleFilter = () => {
    setShowFilters(!showFilters);
  };
  const handleFilterSelect = (e) => {
    const div = e.target.closest(".genresName");
    if (e.target.id) {
      setSearchItem("");
      navigate("/search/movies");
      setIsFocus(true);
      setFilter({
        id: Number(e.target.id),
        name: div.dataset.name,
      });
      setSelectedGenre(e.target.id);
    }
  };
  const handleClickOutside = useCallback((e) => {
    if (
      filterDivRef.current &&
      filterBtn.current &&
      !filterDivRef.current.contains(e.target) &&
      !filterBtn.current.contains(e.target)
    ) {
      setShowFilters(false);
    }
  }, []);

  //*Effects
  useEffect(() => {
    async function fetch() {
      if (location.pathname === "/search/shows") {
        const genres = await getShowsGenres();
        setGenres(genres);
      } else {
        const genres = await getMoviesGenres();
        setGenres(genres);
      }
    }
    fetch();
    return () => setGenres([]);
  }, [location.pathname]);
  useEffect(() => {
    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  return (
    <div className="w-full flex justify-center">
      <div
        className={`sm:px-3 px-2 bg-neutral-700 flex justify-between items-center gap-x-2 lg:w-150 md:w-100 w-[90%] rounded-md h-fit lg:py-2 md:py-1 relative           
        `}
      >
        <span
          onClick={handleClick}
          className={`sm:text-xl md:text-lg text-sm cursor-pointer`}
        >
          {isFocus ? <IoArrowBack /> : <FaSearch />}
        </span>
        <input
          ref={Search_Ref}
          value={searchItem}
          onChange={handleSearch}
          onFocus={() => {
            setIsFocus(true);
            navigate("/search/movies");
            setShowFilters(false);
          }}
          className="w-full outline-0 placeholder:text-xs pt-1 text-sm"
          type="search"
          placeholder="Search Movie By Title."
        />
        <span ref={filterBtn}>
          <FaFilter
            onClick={handleFilter}
            className="md:text-lg text-sm cursor-pointer"
          />
        </span>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleFilterSelect}
            ref={filterDivRef}
            className="h-fit w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] shadow-sm shadow-gray-400 bg-neutral-950 fixed sm:top-[calc(2.2%+0.5rem)] top-[calc(7.5%+0.5rem)] right-0 sm:right-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 rounded-md p-3 z-60"
            style={{
              transform: "translateX(-50%)",
              left: "50%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {genres
              .filter((genre) => !ExcludedCategories.includes(genre.name))
              .map((genre) => (
                <div
                  className="genresName flex items-center gap-2 text-xs sm:text-sm md:text-base"
                  key={genre.id}
                  data-name={genre.name}
                >
                  <input
                    className="scale-80 md:scale-100 cursor-pointer"
                    type="radio"
                    checked={selectedGenre === genre.id}
                    onChange={() => setSelectedGenre(genre.id)}
                    id={genre.id}
                    name="option"
                  />
                  <span className="w-fit text-nowrap overflow-hidden text-ellipsis">
                    {genre.name == "Science Fiction" ? "Sci-Fi" : genre.name}
                  </span>
                </div>
              ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
