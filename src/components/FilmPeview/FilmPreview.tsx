import { FC, useState } from "react";
import { Films } from "../../api/types";
import { useFavoriteMovies } from "../../hooks/useAddFavoriteMovie";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { TrailerForm } from "../TrailerForm/TrailerForm";
import { ExitButton } from "../../ui/ExitButton";
import StarIcon from "../../assets/star.svg";
import HeartIcon from "../../assets/heart.svg";
import HeartIconActive from "../../assets/heartActive.svg";
import RandomIcon from "../../assets/random.svg";
import "./FilmPreview.scss";

interface FilmPreviewProps {
    movie: Films;
    onRandomClick?: () => void;
    onFavoritesCLick?: () => void;
    isMainForm: boolean;
}

export const FilmPreview: FC<FilmPreviewProps> = ({ movie, onRandomClick, onFavoritesCLick, isMainForm }) => {

    const isMain = isMainForm;
    const { isAuthenticated, profile } = useAuth();
    const { addToFavorites, removeFromFavorites } = useFavoriteMovies();
    const [showTrailer, setShowTrailer] = useState(false);
    const isFavorite = profile?.favorites?.includes(String(movie.id)) || false;

    const formatRuntime = (mins: number) => {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return `${hours} ч ${minutes} м`;
    };

    const handleTrailerClick = () => {
        setShowTrailer(true);
    }

    const closeTrailer = () => {
        setShowTrailer(false);
    }


    const handleAddFavorite = async () => {
        if (!isAuthenticated) {
            onFavoritesCLick?.();
            return;
        }

        try {
            if (isFavorite) {
                await removeFromFavorites.mutateAsync(String(movie.id));
            } else {
                await addToFavorites.mutateAsync(String(movie.id));
            }
        } catch (error) {
            console.error("Ошибка при обновлении избранного:", error);
        }
    };

    const handleRandomCLick = () => {
        onRandomClick?.();
        localStorage.removeItem("randomMovie");
    }

    const getGenreImage = (genre: string): string => {
        const imageUrl = new URL(`../../assets/genres/${genre.toLowerCase()}.jpg`, import.meta.url).href;
        return imageUrl;
    };

    return (
        <section className="film-preview">
            <article className="film-preview__block">
                <div className="film-preview__info-block">
                    <span className={`film-preview__grade ${movie.tmdbRating >= 8 ? 'high-rating' : movie.tmdbRating >= 7 ? 'medium-high-rating' : movie.tmdbRating >= 5 ? 'medium-low-rating' : 'low-rating'}`}><img src={StarIcon} />{parseFloat(movie.tmdbRating.toFixed(1))}</span>
                    <span className="film-preview__year">{movie.releaseYear}</span>
                    <span className="film-preview__genre">{movie.genres[0]}</span>
                    <span className="film-preview__duration">{formatRuntime(movie.runtime)}</span>
                </div>
                <h1 className="film-preview__title">{movie.title}</h1>
                <p className="film-preview__description">{movie.searchL}</p>
                <div className="film-preview__button-block">
                    <button className={isMain ? "film-preview__button-block__trailer" : "film-preview__button-block__trailer--media"} onClick={handleTrailerClick}>Трейлер</button>
                    {showTrailer && (
                        <div className="overlay">
                            <div className="trailer-modal">
                                <ExitButton className="trailer-modal__exit" onClick={closeTrailer} />
                                <TrailerForm movie={movie} />
                            </div>
                        </div>
                    )}
                    {isMain ?
                        <Link to={"/about"} state={movie} className="film-preview__button-block__about">О фильме</Link> :
                        null
                    }
                    {isAuthenticated ?
                        <button className={isMain ? "film-preview__button-block__favorites" : "film-preview__button-block__favorites--media"} onClick={handleAddFavorite}>{isFavorite ? <img src={HeartIconActive} /> : <img src={HeartIcon} />}</button> :
                        <button className={isMain ? "film-preview__button-block__favorites" : "film-preview__button-block__favorites--media"} onClick={onFavoritesCLick}><img src={HeartIcon} /></button>
                    }
                    {isMain ?
                        <button className="film-preview__button-block__random" onClick={handleRandomCLick}><img src={RandomIcon} /></button> :
                        null
                    }
                </div>
            </article>
            <div className={isMain ? "film-preview__image-block" : "film-preview__image-block--media"}>
                <img className="film-preview__image" src={movie.posterUrl ?? getGenreImage(movie.genres[0])} alt={movie.title} />
            </div>
        </section>
    );
};