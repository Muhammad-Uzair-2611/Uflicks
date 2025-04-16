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
const genres_URL = `genre/movie/list?api_key=${API_KEY}`;
const filteredMovies_URL = `discover/movie?api_key=${API_KEY}&with_genres=`;

// Custom error handler
const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    throw new Error(
      `API Error: ${
        error.response.data.status_message || "Unknown error occurred"
      }`
    );
  } else if (error.request) {
    console.error("API Request Error:", error.request);
    throw new Error("Network Error: Please check your internet connection");
  } else {
    console.error("API Error:", error.message);
    throw new Error("An unexpected error occurred");
  }
};

export const getTrendingMovies = async () => {
  try {
    const fetch = await axios.get(`${BASE_URL}${trending_URL}`);
    const response = fetch.data.results;

    return response
      .filter((movie) => movie.poster_path != null && movie.overview !== "")
      .map((movie) => ({
        id: movie.id,
        title: movie.title,
        media_type: movie.media_type,
        release_date: movie.release_date,
        poster: movie.poster_path,
      }));
  } catch (error) {
    handleApiError(error);
  }
};

export const getTNowPlayingMovies = async () => {
  try {
    const fetch = await axios.get(`${BASE_URL}${nowPlaying_URL}`);
    const response = fetch.data.results;

    return response
      .filter((movie) => movie.poster_path != null && movie.overview !== "")
      .map((movie) => ({
        id: movie.id,
        title: movie.title,
        media_type: movie.media_type,
        release_date: movie.release_date,
        poster: movie.poster_path,
      }));
  } catch (error) {
    handleApiError(error);
  }
};

export const topRatedMovies = async () => {
  try {
    const fetch = await axios.get(`${BASE_URL}${topRatedMovies_URL}`);
    const response = fetch.data.results;

    return response
      .filter((movie) => movie.poster_path != null && movie.overview !== "")
      .map((movie) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster: movie.poster_path,
        overview: movie.overview,
      }));
  } catch (error) {
    handleApiError(error);
  }
};

export const topRatedTvShows = async () => {
  try {
    const fetch = await axios.get(`${BASE_URL}${topRatedTvShows_URL}`);
    const response = fetch.data.results;

    return response
      .filter((movie) => movie.poster_path != null && movie.overview !== "")
      .map((movie) => ({
        id: movie.id,
        title: movie.name,
        release_date: movie.first_air_date,
        poster: movie.poster_path,
        overview: movie.overview,
      }));
  } catch (error) {
    handleApiError(error);
  }
};

export const getPopularShow = async () => {
  try {
    const fetch = await axios.get(`${BASE_URL}${popularShow_URL}`);
    const response = fetch.data.results;

    return response
      .filter((movie) => movie.poster_path != null && movie.overview !== "")
      .map((movie) => ({
        id: movie.id,
        title: movie.name,
        release_date: movie.first_air_date,
        poster: movie.poster_path,
      }));
  } catch (error) {
    handleApiError(error);
  }
};

export const getSearchResult = async (query, gene) => {
  try {
    const [fetch, fetch2] = await Promise.all([
      axios.get(`${BASE_URL}${SearchMovie_URL}${query}`),
      axios.get(`${BASE_URL}${SearchShow_URL}${query}`),
    ]);

    const response = [...fetch.data.results, ...fetch2.data.results];

    return response
      .filter((movie) => movie.poster_path != null && movie.overview !== "")
      .map((movie) => ({
        id: movie.id,
        title: movie.name ? movie.name : movie.title,
        release_date: movie.first_air_date || movie.release_date,
        poster: movie.poster_path,
        overview: movie.overview,
      }));
  } catch (error) {
    handleApiError(error);
  }
};

export const getImageURL = async () => {
  try {
    const fetch = await axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
    );
    return {
      url: fetch.data.images.secure_base_url,
      sizes: fetch.data.images.poster_sizes,
    };
  } catch (error) {
    handleApiError(error);
  }
};
export const getGenres = async () => {
  try {
    const fetch = await axios.get(`${BASE_URL}${genres_URL}`);
    return fetch.data.genres;
  } catch (error) {
    handleApiError(error);
  }
};
export const getFliteredMovies = async (genre) => {
  try {
    const allMovies = [];
    const totalPages = 9; // Fetching pages 1 to 13

    for (let page = 1; page <= totalPages; page++) {
      const fetch = await axios.get(
        `${BASE_URL}${filteredMovies_URL}${genre}&page=${page}`
      );
      const response = fetch.data.results;

      const filteredMovies = response 
        .filter((movie) => movie.poster_path != null && movie.overview !== "")
        .map((movie) => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster: movie.poster_path,
          overview: movie.overview,
        }));

      allMovies.push(...filteredMovies);
    }

    return allMovies;
  } catch (error) {
    handleApiError(error);
  }
};
