import React from "react";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <>
      <div
        className="md:w-35 md:h-55 sm:w-30 sm:h-45 w-25 h-36 rounded-lg cursor-pointer bg-no-repeat bg-cover sm:mb-3 mb-2  shadow-sm shadow-gray-500"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780/${props.poster})`,
        }}
      ></div>

      <span className="font-semibold sm:text-xl text-sm mt-5 ">
        {props.title.length > 20
          ? props.title.slice(0, 20) + "..."
          : props.title}
      </span>
    </>
  );
};

export default MovieCard;
