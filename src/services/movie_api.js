import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3/`;
const search_URL = `search/movie?api_key=${API_KEY}&language=en-US&query=`;
const trending_URL = `trending/movie/day?api_key=${API_KEY}&language=en-US`;
const nowPlaying_URL = `movie/now_playing?api_key=${API_KEY}`;
const popularShow_URL = `tv/popular?api_key=${API_KEY}`;
const topRatedMovies_URL = `movie/top_rated?api_key=${API_KEY}`;
const topRatedTvShows_URL = `tv/top_rated?api_key=${API_KEY}`;
const SearchMovie_URL = `search/movie?api_key=${API_KEY}&query=`;
const SearchShow_URL = `search/tv?api_key=${API_KEY}&query=`;
export const getMovies = async (title) => {
  const fetch = await axios.get(`${BASE_URL}${search_URL}${title}`);
  let response = fetch.data.results;
};

export const getTrendingMovies = async () => {
  const fetch = await axios.get(`${BASE_URL}${trending_URL}`);
  let response = fetch.data.results;

  const trendingMovies = response.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      media_type: movie.media_type,
      release_date: movie.release_date,
      poster: movie.poster_path,
    };
  });
  return trendingMovies;
};
export const getTNowPlayingMovies = async () => {
  const fetch = await axios.get(`${BASE_URL}${nowPlaying_URL}`);
  let response = fetch.data.results;

  const nowPlayingMovies = response.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      media_type: movie.media_type,
      release_date: movie.release_date,
      poster: movie.poster_path,
    };
  });
  return nowPlayingMovies;
};
export const topRatedMovies = async () => {
  const fetch = await axios.get(`${BASE_URL}${topRatedMovies_URL}`);

  let response = fetch.data.results;

  const topRatedMovies = response.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster: movie.poster_path,
      overview: movie.overview,
    };
  });
  return topRatedMovies;
};
export const topRatedTvShows = async () => {
  const fetch = await axios.get(`${BASE_URL}${topRatedTvShows_URL}`);

  let response = fetch.data.results;

  const topRatedTvShows = response.map((movie) => {
    return {
      id: movie.id,
      title: movie.name,
      release_date: movie.first_air_date,
      poster: movie.poster_path,
      overview: movie.overview,
    };
  });
  return topRatedTvShows;
};

export const getPopularShow = async () => {
  const fetch = await axios.get(`${BASE_URL}${popularShow_URL}`);
  let response = fetch.data.results;

  const popularShow = response.map((movie) => {
    return {
      id: movie.id,
      title: movie.name,
      release_date: movie.first_air_date,
      poster: movie.poster_path,
    };
  });
  return popularShow;
};
export const getSearchResult = async (query) => {
  const fetch = await axios.get(`${BASE_URL}${SearchMovie_URL}${query}`);
  const fetch2 = await axios.get(`${BASE_URL}${SearchShow_URL}${query}`);

  const response = [...fetch.data.results, ...fetch2.data.results];

  const SearchResult = response
    .filter((movie) => movie.poster_path != null && movie.overview !== "")
    .map((movie) => ({
      id: movie.id,
      title: movie.name ? movie.name : movie.title,
      release_date: movie.first_air_date || movie.release_date,
      poster: movie.poster_path,
      overview: movie.overview,
    }));

  return SearchResult;
};

export const getImageURL = async () => {
  const fetch = await axios.get(
    `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
  );
  const ImageURl = fetch.map((d) => ({
    url: d.data.images.secure_base_url,
    sizes: d.data.images.poster_sizes,
  }));
  // return ImageURl;
};
