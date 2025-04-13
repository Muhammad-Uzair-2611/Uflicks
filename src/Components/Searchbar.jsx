import { FaSearch } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { React, useState, useRef } from "react";
import { useSearch } from "../Context/Searchcontext";
const Searchbar = () => {
  //*States
  const [query, set_Query] = useState("");
  const { isFocus, setIsFocus } = useSearch();
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
    Debounce((value) => {
      console.log("Searching for:", value);
    }, 500)
  ).current;

  const handleSearch = (e) => {
    const value = e.target.value;
    set_Query(value);
    debouncedSearch(value);
  };
  const handleClick = () => {
    !isFocus && Search_Ref.current?.focus();
  };

  return (
    <div className="w-full flex justify-center mt-5">
      <div
        className={`px-3 bg-neutral-800 flex items-center gap-x-2 sm:w-2/3 w-[80%] sm:rounded-3xl rounded-xl h-10`}
      >
        <span onClick={handleClick} className="text-xl cursor-pointer">
          {isFocus ? <IoArrowBack /> : <FaSearch />}
        </span>
        <input
          ref={Search_Ref}
          value={query}
          onChange={handleSearch}
          onFocus={() => {
            setIsFocus(true);
          }}
          className="w-full outline-0"
          type="search"
          placeholder="Search Movie By Title."
        />
      </div>
    </div>
  );
};

export default Searchbar;
