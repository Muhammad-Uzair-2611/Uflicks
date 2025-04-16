import { FaSearch, FaFilter } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { React, useState, useRef, useEffect } from "react";
import { useSearch } from "../Context/Searchcontext";
import { getSearchResult, getGenres } from "../services/movie_api";
import { motion } from "framer-motion";
const Searchbar = () => {
  //*States
  const [showFilters, setShowFilters] = useState(false);
  const [genres, setGenres] = useState([]);
  const {
    isFocus,
    setIsFocus,
    searchItem,
    setSearchItem,
    setSearchResult,
    setFilter,
  } = useSearch();
  const Search_Ref = useRef(null);

  useEffect(() => {
    async function fetch() {
      const genres = await getGenres();
      setGenres(genres);
    }
    fetch();
  }, []);

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
      console.log(searchResult);
      setSearchResult(searchResult);
    }, 500)
  ).current;

  const handleSearch = (e) => {
    const value = e.target.value;
    value != " " && setSearchItem(value);
    debouncedSearch(value);
  };
  const handleClick = () => {
    !isFocus ? Search_Ref.current?.focus() : setIsFocus(false);
  };
  const handleFilter = () => {
    setShowFilters(!showFilters);
    setTimeout(() => {
      setShowFilters(false);
    }, 4000);
  };
  const handleFilterSelect = (e) => {
    const div = e.target.closest(".genresName");
    if (e.target.id) {
      setIsFocus(true);
      setFilter({
        id: e.target.id,
        name: div.innerText,
      });
    }
  };

  return (
    <div className="w-full flex justify-center mt-5">
      <div
        className={`px-3 bg-neutral-800 flex justify-between items-center gap-x-2 sm:w-2/3 w-[93%] sm:rounded-3xl rounded-lg h-fit sm:py-2 py-1 relative`}
      >
        <span
          onClick={handleClick}
          className="sm:text-xl text-sm cursor-pointer"
        >
          {isFocus ? (
            <IoArrowBack onClick={() => setSearchItem("")} />
          ) : (
            <FaSearch />
          )}
        </span>
        <input
          ref={Search_Ref}
          value={searchItem}
          onChange={handleSearch}
          onFocus={() => {
            setIsFocus(true);
            setShowFilters(false);
          }}
          className="w-full outline-0 placeholder:text-sm"
          type="search"
          placeholder="Search Movie By Title."
        />
        <span>
          <FaFilter onClick={handleFilter} className="text-lg cursor-pointer" />
        </span>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleFilterSelect}
            className="h-fit w-fit
         shadow-sm shadow-gray-400 bg-neutral-950 absolute sm:right-4 right-2 sm:-bottom-75 -bottom-60 grid grid-cols-3 gap-4 rounded-md py-3 sm:px-4 px-2 [&>div]:flex [&>div]:gap-x-2 z-10 [&>div]:font-semibold 
         [&>div>input]:cursor-pointer sm:[&>div]:text-lg [&>div]:text-[10px]"
          >
            {genres.map((genre) => (
              <div className="genresName" key={genre.id}>
                <input type="radio" id={genre.id} name="option" />
                {genre.name == "Science Fiction" ? "Sci-Fi" : genre.name}
              </div>
            ))}
            <div className="genresName">
              <input type="radio" id={"28,12,878"} name="option" />
              Discover
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
