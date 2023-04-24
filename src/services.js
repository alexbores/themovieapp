import axios from 'axios';

const API_KEY = '199a8db04bfd593e813f3ad1120d2995';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getMovies() {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export async function getMovie(movies) {
  const nextPage = (movies.length === 0)? 1 : Math.ceil(movies.length / 10);
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${nextPage}`);
    const data = response?.data.results;
    console.log(data);
    return data.find(
      (movie) => !movies.some((m) => m.id === movie.id)
    );
  } catch (error) {
    console.error('Error fetching movie:', error);
    return [];
  }
}