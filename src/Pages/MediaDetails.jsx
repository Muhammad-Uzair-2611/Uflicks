import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  getMovieDetails,
  getImageURL,
  getBackDropImages,
  getShowDetails,
} from "../services/movie_api";
import { useMovieInfo } from "../Context/MovieInfoContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageGallery from "../Components/ImageGallery ";

const MediaDetails = () => {
  //* States
  const { isAllowed, movieId: id, setIsAllowed } = useMovieInfo();
  const [mediaInfo, setMediaInfo] = useState({});
  const [sceneShots, setSceneShots] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [ImageURL, setImageURL] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSeasonId, setOpenSeasonId] = useState(null);

  const navigate = useNavigate();

  //*Functions
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  //*Effects
  useEffect(() => {
    if (!isAllowed) {
      const allowedFromStorage = JSON.parse(
        sessionStorage.getItem("isAllowed")
      );
      if (!allowedFromStorage) {
        navigate("/");
      } else {
        setIsAllowed(true);
      }
    }
  }, [isAllowed, navigate, setIsAllowed]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let promise;
        let type = id.type == "show" ? "tv" : id.type;
        if (id?.type == "movie") promise = getMovieDetails(id.id);
        else promise = getShowDetails(id.id);
        const [imageURl, details, sceneShots] = await Promise.all([
          getImageURL(),
          promise,
          getBackDropImages(id.id, type),
        ]);
        const shuffledArray = shuffleArray(sceneShots);

        setSceneShots(shuffledArray);
        setImageURL(imageURl);
        setMediaInfo(details);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    }
    if (isAllowed && id) {
      fetchData();
    }
  }, [isAllowed, id]);

  const handleSeasonClick = (seasonId) => {
    setOpenSeasonId(openSeasonId === seasonId ? null : seasonId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
        <motion.div
          className="bg-neutral-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg border border-neutral-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-red-500 text-xl md:text-2xl">⚠️</div>
            <h2 className="text-xl md:text-2xl font-bold text-red-500">
              Error Loading Content
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="relative space-y-5">
        <div className=" h-fit relative ">
          <div className="backImage w-full h-full absolute -z-10 bg-black/30 lg:rounded-none rounded-lg  ">
            <div
              className={`absolute z-15 bg-black/40 inset-0 lg:block hidden`}
            >
              {" "}
            </div>
            <img
              className="w-full h-full lg:block hidden "
              src={`${ImageURL?.url}${ImageURL?.banner_sizes[3]}${mediaInfo.banner}`}
              alt=""
            />
          </div>
          <div className="md:h-30 h-20 px-4 py-3">
            <span
              onClick={() => navigate(-1)}
              className="text-3xl sm:text-4xl cursor-pointer"
            >
              <IoArrowBack />
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-x-8 mx-4 sm:mx-8 lg:mx-16">
            <div className="z-10 h-fit flex flex-col items-center justify-center gap-y-5 mb-5 lg:mb-0">
              <div
                id="poster"
                className="w-40 sm:w-48 md:w-56 lg:w-60 overflow-hidden h-auto shadow-sm shadow-gray-400 cursor-pointer rounded-lg"
              >
                <a href={mediaInfo.ticket} target="_blank">
                  <img
                    className="w-full h-full object-cover"
                    src={`${ImageURL?.url}${ImageURL?.sizes[2]}${mediaInfo.poster}`}
                    alt=""
                  />
                </a>
              </div>
              <a
                href={mediaInfo.ticket || "/notFound "}
                target="_blank"
                className="w-full sm:w-auto"
              >
                <button className="w-full transition-all bg-amber-400 text-black py-2.5 font-semibold cursor-pointer px-5 rounded-sm hover:scale-102 translate-y-1 hover:translate-y-0 duration-400 hover:shadow-md hover:shadow-amber-200 text-sm sm:text-base">
                  Visit Official Site
                </button>
              </a>
            </div>
            <div className="Info mb-10 lg:mb-20 flex-1">
              <div className="mb-6 sm:mb-8">
                <div className="text-xl sm:text-2xl -space-x-1.5 font-semibold tracking-wider">
                  <span>{mediaInfo.title}</span>{" "}
                  <span className="text-[14px] sm:text-[16px] text-neutral-300">
                    ({mediaInfo.release.split("-").slice(0, 1)})
                  </span>
                </div>
                <div className="py-2 text-amber-400 tracking-wide text-sm sm:text-base">
                  {mediaInfo.tagline || "A story worth watching."}
                </div>
              </div>
              <div className="space-y-4">
                <div
                  className="border-y backdrop-blur-xs bg-black/40 border-white rounded-md px-3 sm:px-4 w-full text-xs sm:text-sm gap-x-4 flex items-center shrink-0 flex-wrap py-4
          [&_h2]:text-neutral-300 [&>div]:flex [&>div]:gap-x-2 [&>div]:text-nowrap [&>div]:flex-wrap"
                >
                  <div className="items-center [&>p]:text-amber-300 space-y-2 sm:space-y-0">
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">Genres - </h2>
                      {mediaInfo.genres.map((genre, index) => (
                        <p key={index}>{genre}</p>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">Release - </h2>
                      <span>{mediaInfo.release}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">Production Companies - </h2>
                      {mediaInfo.productionCompanies.length > 0
                        ? mediaInfo.productionCompanies.map((comp, index) => (
                            <span key={index}>{`${comp} ${
                              index != mediaInfo.productionCompanies.length - 1
                                ? ","
                                : ""
                            }`}</span>
                          ))
                        : "Not Mentioned "}
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">Status - </h2>
                      <span>{mediaInfo.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">Languages - </h2>
                      {mediaInfo.spoken_languages.map((lang, index) => (
                        <span key={index}>{`${lang} ${
                          index != mediaInfo.spoken_languages.length - 1
                            ? ","
                            : ""
                        }`}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">Type - </h2>
                      <span>
                        {mediaInfo.type
                          ? mediaInfo.type
                          : id.type === "movie"
                          ? "Movie"
                          : "Show"}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="border-y backdrop-blur-xs bg-black/40 px-3 sm:px-4 border-white rounded-md w-full text-xs sm:text-sm gap-x-4 flex items-center shrink-0 flex-wrap py-4
          [&_h2]:text-neutral-300 [&>div]:flex [&>div]:gap-x-2  [&>div]:lg:flex-row  [&>div]flex-col"
                >
                  <div className="space-y-2 sm:space-y-0 w-full">
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">
                        {mediaInfo.numofEpisode
                          ? "Total Episodes "
                          : "Run Time  "}{" "}
                      </h2>
                      <span>
                        {mediaInfo.runtime
                          ? `${mediaInfo.runtime} Minutes`
                          : `${mediaInfo.numofEpisode}`}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">
                        {mediaInfo.totalSeason ? "Total Seasons " : "Budget "}{" "}
                      </h2>
                      <span>
                        {mediaInfo.budget
                          ? mediaInfo.budget || "Not Available"
                          : mediaInfo.totalSeason?.length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">
                        {mediaInfo.lastRelease ? "Last Release " : "Revenue  "}{" "}
                      </h2>
                      <span>
                        {mediaInfo.revenue
                          ? mediaInfo.revenue || "Not Available"
                          : mediaInfo?.lastRelease}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">TMBD Rating </h2>
                      <span>
                        {JSON.stringify(mediaInfo.rating).slice(0, 3)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <h2 className="">Vote Count </h2>
                      <span>{mediaInfo.vote}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="w-1 h-6 bg-amber-400 rounded-full"></div>
                    <h2 className="text-lg sm:text-xl font-semibold text-amber-400 tracking-wide">
                      Overview
                    </h2>
                  </div>
                  <div className="backdrop-blur-xs bg-black/40 p-4 sm:p-6 h-fit border-y flex flex-col items-start gap-y-4 justify-center rounded-md w-full text-sm sm:text-base leading-relaxed">
                    {mediaInfo.overview}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {id.type == "show" && (
          <div>
            <div className="flex gap-2 px-4">
              <div className="w-1 h-6 bg-amber-400 rounded-full"></div>
              <h2 className="text-3xl tracking-widest font-semibold text-white ">
                All Seasons
              </h2>
            </div>
            <div className="space-y-8 px-2 sm:px-4 py-4 sm:py-6 w-full">
              {mediaInfo.totalSeason.map((season, index) => (
                <div key={season.id} className="group">
                  <div
                    onClick={() => handleSeasonClick(season.id)}
                    className="w-full h-16 sm:h-20 md:h-24 rounded-t-lg flex justify-between items-center px-3 sm:px-4 md:px-6 text-base sm:text-lg md:text-xl bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 shadow-lg shadow-black/20 cursor-pointer transition-all duration-300 hover:bg-neutral-700/80"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="text-amber-400 font-medium text-sm sm:text-base md:text-lg">
                        {season.name}
                      </span>
                    </div>
                    <span
                      className={`text-2xl sm:text-3xl md:text-4xl text-amber-400 transition-transform duration-300 ${
                        openSeasonId === season.id ? "rotate-180" : ""
                      }`}
                    >
                      <RiArrowDropDownLine />
                    </span>
                  </div>
                  <div
                    className={`flex flex-col md:flex-row gap-4 md:gap-6 w-full px-3 sm:px-4 md:px-6 rounded-b-lg bg-neutral-800/60 backdrop-blur-sm border-x border-b border-neutral-700/50 shadow-lg shadow-black/20 transition-all duration-300 ${
                      openSeasonId === season.id
                        ? "max-h-[2000px] opacity-100 py-4 sm:py-6"
                        : "max-h-0 p-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      <div className="w-48 sm:w-56 md:w-64 h-72 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl shadow-black/30 transition-transform duration-300 hover:scale-105">
                        <img
                          className="w-full h-full object-cover"
                          src={`${ImageURL?.url}${ImageURL?.sizes[3]}${season.poster_path}`}
                          alt={`${season.name} poster`}
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4 sm:space-y-6">
                      <div className="space-y-1 sm:space-y-2">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-wide">
                          {mediaInfo.title} {season.name}
                        </h3>
                        <p className="text-amber-400/80 text-xs sm:text-sm">
                          {season?.air_date?.split("-").slice(0, 1) ||
                            "Release date not available"}
                        </p>
                      </div>
                      <div className="bg-neutral-900/50 p-3 sm:p-4 rounded-lg border border-neutral-700/50 min-h-[120px] sm:min-h-[160px]">
                        <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                          {season.overview ||
                            "No overview available for this season."}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 pt-3 sm:pt-4 border-t border-neutral-700/50">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 text-sm sm:text-base">
                            Total Episodes:
                          </span>
                          <span className="text-white font-medium text-sm sm:text-base">
                            {season.episode_count}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 text-sm sm:text-base">
                            TMDB Rating:
                          </span>
                          <span className="text-white font-medium text-sm sm:text-base">
                            {season.vote_average}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-4">
          <div className="flex gap-2 px-4">
            <div className="w-1 h-6 bg-amber-400 rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl tracking-widest font-semibold text-white">
              Photos
            </h2>
          </div>
          <div className="w-full h-full">
            <div className="flex shrink-0 mb-10 flex-wrap gap-x-4 gap-y-5 w-full items-center px-4 sm:px-5 h-fit">
              {sceneShots.map((path, index) =>
                index <= 5 ? (
                  <div
                    key={index}
                    className="cursor-pointer w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] aspect-[16/9] rounded-md overflow-hidden"
                  >
                    <img
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      src={`${ImageURL?.url}${ImageURL?.banner_sizes[1]}${path}`}
                      alt={`Photo-${index}`}
                    />
                  </div>
                ) : index == 6 ? (
                  <div
                    onClick={() => {
                      setShowGallery(true);
                    }}
                    key={index}
                    className="cursor-pointer w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.5rem)] aspect-[16/9] hover:scale-105 transition-transform duration-300 rounded-md overflow-hidden relative"
                  >
                    <div className="absolute w-full h-full bg-black/60 backdrop-blur-xs z-10 text-4xl sm:text-5xl md:text-6xl flex items-center justify-center">
                      <span>{`+${sceneShots.length}`}</span>
                    </div>
                    <img
                      className="w-full h-full object-cover"
                      src={`${ImageURL?.url}${ImageURL?.banner_sizes[0]}${path}`}
                      alt={`Photo-${index}`}
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {showGallery && (
        <ImageGallery
          images={sceneShots}
          ImgSource={ImageURL}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};

export default MediaDetails;
