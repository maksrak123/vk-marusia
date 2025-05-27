import { API_URL } from "./url";
import { validateResponse } from "./validateResponce";
import { FilmsSchema,  FilmsList } from "./types";

export function addFavoriteFilm(movieId: string ): Promise<void> {
    return fetch(`${API_URL}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movieId }),
        credentials: 'include',
    })
    .then(validateResponse)
    .then(() => undefined);
}

export async function fetchFavoriteFilm(): Promise<FilmsList> {
    const response = await fetch(`${API_URL}/favorites`, {
        credentials: 'include',
    });
    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Expected array of favorites');
    }
    
    return Promise.all(data.map(item => FilmsSchema.parseAsync(item)));
}

export function deleteFavoriteFilm(movieId: string): Promise<boolean> {
    return fetch(`${API_URL}/favorites/${movieId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    }).then(validateResponse)
    .then(() => true);
}


