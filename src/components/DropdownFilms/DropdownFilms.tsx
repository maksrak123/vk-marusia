import { getMoviesByTitle } from "../../api/movies";
import { FC } from "react";
import { Loader } from "../../ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import StarIcon from "../../assets/star.svg";
import "./DropdownFilms.scss";

interface DropdownFilmsProps {
    title: string;
    onClick: () => void;
}

export const DropdownFilms: FC<DropdownFilmsProps> = ({ title, onClick }) => {

    const filmsListQuery = useQuery(
        {
            queryFn: () => getMoviesByTitle(title),
            queryKey: ["movies", title],
            retry: 1,
            refetchOnWindowFocus: false,
        },
    );

    const formatRuntime = (mins: number) => {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return `${hours} ч ${minutes} м`;
    };

    switch (filmsListQuery.status) {
        case "pending":
            return <Loader />;

        case "success":
            if (filmsListQuery.data.length === 0) {
                return null;
            }

            return (
                <section className="dropdown">
                    <ul className="dropdown__list">
                        {filmsListQuery.data.slice(0, 5).map((film, index) => (
                            <Link className="films__link" onClick={onClick} to={"/about"} state={film}>
                                <li className="dropdown__item" key={index}>
                                    <img src={film.posterUrl ?? undefined} alt={film.title} className="dropdown__image" />
                                    <div className="dropdown__description">
                                        <div className="dropdown__info-block">
                                            <span className={`dropdown__grade ${film.tmdbRating >= 8 ? 'high-rating' : film.tmdbRating >= 7 ? 'medium-high-rating' : film.tmdbRating >= 5 ? 'medium-low-rating' : 'low-rating'}`}><img src={StarIcon} />{parseFloat(film.tmdbRating.toFixed(1))}</span>
                                            <span className="dropdown__year">{film.releaseYear}</span>
                                            <span className="dropdown__genre">{film.genres[0]}</span>
                                            <span className="dropdown__duration">{formatRuntime(film.runtime)}</span>
                                        </div>
                                        <h2 className="dropdown__title">{film.title}</h2>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </section>
            )

        case "error":
            return (
                <div>
                    <span>Произошла ошибка{filmsListQuery.error.message}</span>


                    <button onClick={() => filmsListQuery.refetch()}>Повторить запрос</button>
                </div>
            );
    }
}