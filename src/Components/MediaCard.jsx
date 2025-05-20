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
        className="w-[120px] h-[180px] sm:w-[150px] sm:h-[225px] md:w-[180px] md:h-[270px] lg:w-[200px] lg:h-[300px] overflow-hidden rounded-lg cursor-pointer mb-2 shadow-sm shadow-gray-500"
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

      <span className="font-semibold text-sm sm:text-base md:text-lg">
        {props.title.length > 15
          ? props.title.slice(0, 15) + "..."
          : props.title}
      </span>
    </>
  );
};

export default MovieCard;
