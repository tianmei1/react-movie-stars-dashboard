import axios from 'axios';

const API_KEY = '4cf27df88acd62636b9579e2e7891046';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Fetch popular actors
export const fetchPopularActors = (page = 1) => tmdbApi.get('/person/popular', { params: { page } });

// Search for actors
export const searchActors = (query) =>
  tmdbApi.get('/search/person', { params: { query } });