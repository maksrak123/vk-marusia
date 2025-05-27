import { API_URL } from "./url";
import { Films, FilmsSchema, FetchMoviesParams, Genre, GenresSchema, FilmsList } from "./types";
import { validateResponse } from "./validateResponce";

export function fetchMovieByFilters(params: FetchMoviesParams): Promise<Films> {
    const query = new URLSearchParams();
    if (params.count) query.set("count", params.count.toString());
    if (params.page) query.set("page", params.page.toString());
    if (params.title) query.set("title", params.title);
    if (params.genre) query.set("genre", params.genre);
  
    return fetch(`${API_URL}/movie?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(validateResponse)
    .then((data) => FilmsSchema.parse(data));
}

export function getMoviesByGenre(genreId: string): Promise<FilmsList> {
  return fetch(`${API_URL}/movie?genre=${genreId}`).then(res => validateResponse(res)).then(res => res.json())
}

export function getMoviesByTitle(title: string): Promise<FilmsList> {
  return fetch(`${API_URL}/movie?title=${title}`).then(res => validateResponse(res)).then(res => res.json())
}

export async function fetchMovieTop10(): Promise<FilmsList> {
  const response = await fetch(`${API_URL}/movie/top10`);
  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Expected array of movies');
  }

  return Promise.all(data.map(item => FilmsSchema.parseAsync(item)));
}

export async function fetchGenres(): Promise<Genre> {
  const response = await fetch(`${API_URL}/movie/genres`);
  const data = await response.json();
  return GenresSchema.parse(data);
}

export function fetchMovieById(movieId: number): Promise<Films> {
    return fetch(`${API_URL}/movie/${movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(validateResponse)
    .then((data) => FilmsSchema.parse(data));
}

export async function fetchRandomMovie(): Promise<Films> {
  const response = await fetch(`${API_URL}/movie/random`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
  const data = await response.json();
  return FilmsSchema.parse(data);
}



