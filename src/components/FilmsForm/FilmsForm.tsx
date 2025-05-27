import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import { getMoviesByGenre } from "../../api/movies";
import { Loader } from "../../ui/Loader";
import { useLocation } from "react-router-dom";
import "./FilmsForm.scss";

export const FilmsForm = () => {
    const location = useLocation();
    const genre = location.state;
    const [filmsCount, setFilmsCount] = useState(15);

    const filmsListQuery = useQuery({
        queryFn: () => getMoviesByGenre(genre),
        queryKey: ["genres", genre],
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const loadMoreFilms = () => {
        setFilmsCount(prev => prev + 10);
    };

    const getGenreImage = (genre: string): string => {
        const imageUrl = new URL(`../../assets/genres/${genre.toLowerCase()}.jpg`, import.meta.url).href;
        return imageUrl;
    };

    switch (filmsListQuery.status) {
        case "pending":
            return <Loader />;

        case "success": {
            const films = filmsListQuery.data;
            const buttonCheck = filmsCount < films.length;

            return (
                <section className="films">
                    <Link to={"/genres"} className="films__title">
                        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="films__icon">
                            <path d="M5.04701 11.0012L13.2967 19.2507L10.9397 21.6077L0.333008 11.0012L10.9397 0.394531L13.2967 2.75155L5.04701 11.0012Z" fill="white" />
                        </svg>
                        {genre}
                    </Link>
                    <ul className="films__list">
                        {films.slice(0, filmsCount).map((film, index) => (
                            <li className="films__item" key={index}>
                                <Link className="films__link" to={"/about"} state={film}>
                                    <img src={film.posterUrl ?? getGenreImage(film.genres[0])} alt={film.title} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="films__more">
                        {buttonCheck && (
                            <button
                                className="films__button"
                                onClick={loadMoreFilms}
                            >
                                Показать ещё
                            </button>
                        )}
                    </div>
                </section>
            );
        }

        case "error":
            return (
                <div>
                    <span>Произошла ошибка: {filmsListQuery.error.message}</span>
                    <button onClick={() => filmsListQuery.refetch()}>Повторить запрос</button>
                </div>
            );
    }
};
