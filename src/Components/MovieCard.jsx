import React from "react";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <>
      <div
        className="md:w-35 md:h-55 sm:w-30 sm:h-45 w-27 h-42 rounded-2xl cursor-pointer bg-no-repeat bg-cover mb-3 shadow-sm shadow-gray-500"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780/${props.poster})`,
        }}></div>

      <span className="font-semibold text-xl mt-5 ">{props.title}</span>
    </>
  );
};

export default MovieCard;
