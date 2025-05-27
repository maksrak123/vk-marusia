import { FC } from "react";
import { FilmsList } from "../../api/types";
import { Link } from "react-router-dom";
import "./Top10Films.scss";

export interface FilmsListProps {
    filmsList: FilmsList
}

export const Top10Films: FC<FilmsListProps> = ({ filmsList }) => {

    const getGenreImage = (genre: string): string => {
        const imageUrl = new URL(`../../assets/genres/${genre.toLowerCase()}.jpg`, import.meta.url).href;
        return imageUrl;
    };

    return (
        <section className="top10">
            <h2 className="top10__title">
                Топ 10 фильмов
            </h2>
            <ul className="top10__list">
                {filmsList.map((film, count) => (
                    <li className="top10__item" key={film.id}>
                        <Link to={"/about"} className="top10__link" state={film}>
                            <span className="top10__rank">{count + 1}</span>
                            <img src={film.posterUrl ?? getGenreImage(film.genres[0])} alt={film.title} loading="lazy"/>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}