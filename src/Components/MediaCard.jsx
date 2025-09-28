import React, { useEffect } from "react";
import { useMovieInfo } from "../Context/MovieInfoContext";
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {
  //*Custom Hook
  const { setIsAllowed, setMovieId, movieId } = useMovieInfo();
  const navigate = useNavigate();

  //*Functions
  const handleClick = () => {
    setIsAllowed(true);
    const mediaType = props.type;
    setMovieId({ id: props.id, type: mediaType });
    navigate(`/media/${props.id}`);
  };

  return (
    <>
      <div
        onClick={handleClick}
        id={props.id}
        data-type={props.type}
        className="w-[100px] h-[150px] xs:w-[120px] xs:h-[180px] sm:w-[140px] sm:h-[210px] md:w-[160px] md:h-[240px] lg:w-[180px] lg:h-[270px] xl:w-[200px] xl:h-[300px] overflow-hidden rounded-lg cursor-pointer mb-2 shadow-sm shadow-gray-500 transition-transform hover:scale-105"
      >
        <img
          className="w-full h-full object-cover"
          loading="lazy"
          src={`${props.url}${props.size}${props.poster}`}
          alt={props.title}
          width={props.size === "w342" ? 342 : 500}
          height={props.size === "w342" ? 513 : 750}
        />
      </div>

      <span className="font-semibold text-xs xs:text-sm sm:text-base md:text-lg truncate max-w-full">
        {props.title.length > 20
          ? props.title.slice(0, 20) + "..."
          : props.title}
      </span>
    </>
  );
};

export default MovieCard;
