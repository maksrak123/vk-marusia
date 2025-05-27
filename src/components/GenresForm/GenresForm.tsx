import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../../api/movies";
import { Loader } from "../../ui/Loader";
import "./GenresForm.scss";

export const GenresForm = () => {
    const genresQuery = useQuery(
        {
            queryFn: () => fetchGenres(),
            queryKey: ["genres"],
            retry: 1,
            refetchOnWindowFocus: false,
        },
    );

    const getGenreImage = (genre: string): string => {
        const imageUrl = new URL(`../../assets/genres/${genre.toLowerCase()}.jpg`, import.meta.url).href;
        return imageUrl;
    };

    switch (genresQuery.status) {
        case "pending":
            return <Loader />;

        case "success":
            return (
                <section className="genres">
                    <h2 className="genres__title">
                        Жанры фильмов
                    </h2>
                    <ul className="genres__list">
                        {genresQuery.data.map((genre, index) => (
                            <li className="genres__item" key={index}>
                                <Link className="genres__link" to={"/films"} state={genre}>
                                    <img src={getGenreImage(genre)} alt={genre} />
                                    <span className="genres__description">{genre}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )

        case "error":
            return (
                <div>
                    <span>Произошла ошибка{genresQuery.error.message}</span>


                    <button onClick={() => genresQuery.refetch()}>Повторить запрос</button>
                </div>
            );
    }
}