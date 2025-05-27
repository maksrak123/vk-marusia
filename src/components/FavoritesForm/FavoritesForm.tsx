import { FC } from "react";
import { FilmsList } from "../../api/types";
import { ExitButton } from "../../ui/ExitButton";
import "./FavoriteForm.scss";

export interface FavoritesFormProps {
    favoritesList: FilmsList;
    onDelete: (filmId: string) => void;
}

export const FavoritesForm: FC<FavoritesFormProps> = ({ 
    favoritesList, 
    onDelete 
}) => {

    const getGenreImage = (genre: string): string => {
        const imageUrl = new URL(`../../assets/genres/${genre.toLowerCase()}.jpg`, import.meta.url).href;
        return imageUrl;
    };

    return (
        <section className="favorites">
            <ul className="favorites__list">
                {favoritesList.map((film) => (
                    <li className="favorites__item" key={film.id}>
                        <ExitButton className="favorites__button" onClick={() => onDelete(String(film.id))} />
                        <img 
                            src={film.posterUrl ?? getGenreImage(film.genres[0])} 
                            alt={film.title} 
                            className="favorites__poster"
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

