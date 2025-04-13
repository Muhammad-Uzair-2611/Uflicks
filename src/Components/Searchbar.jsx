import { FaSearch } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { React, useState, useRef } from "react";
import { useSearch } from "../Context/Searchcontext";
import { getSearchResult } from "../services/movie_api";
const Searchbar = () => {
  //*States
  const { isFocus, setIsFocus, searchItem, setSearchItem, setSearchResult } =
    useSearch();
  const Search_Ref = useRef(null);
  //*Functions
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
      let searchResult = await getSearchResult(searchItem);
      setSearchResult(searchResult);
    }, 500)
  ).current;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    debouncedSearch(value);
  };
  const handleClick = () => {
    !isFocus ? Search_Ref.current?.focus() : setIsFocus(false);
  };

  return (
    <div className="w-full flex justify-center mt-5">
      <div
        className={`px-3 bg-neutral-800 flex items-center gap-x-2 sm:w-2/3 w-[93%] sm:rounded-3xl rounded-lg h-fit sm:py-2 py-1`}
      >
        <span
          onClick={handleClick}
          className="sm:text-xl text-sm cursor-pointer"
        >
          {isFocus ? <IoArrowBack /> : <FaSearch />}
        </span>
        <input
          ref={Search_Ref}
          value={searchItem}
          onChange={handleSearch}
          onFocus={() => {
            setIsFocus(true);
          }}
          className="w-full outline-0 placeholder:text-sm"
          type="search"
          placeholder="Search Movie By Title."
        />
      </div>
      <button
        onClick={() => getSearchResult("daredevil")}
        className="bg-orange-600 p-3 cursor-pointer"
      >
        Click me to Search
      </button>
    </div>
  );
};

export default Searchbar;
