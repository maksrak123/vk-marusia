import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteFilm } from "../../api/favorites";
import { useFavoriteMovies } from "../../hooks/useAddFavoriteMovie";
import { Loader } from "../../ui/Loader";
import { FavoritesForm } from "./FavoritesForm";

export const FetchFavoritesForm = () => {
    const { removeFromFavorites } = useFavoriteMovies();
    const favoriteFilmsQuery = useQuery({
        queryFn: fetchFavoriteFilm,
        queryKey: ["favorites"],
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const handleDelete = (filmId: string) => {
        removeFromFavorites.mutate(filmId);
    };

    switch (favoriteFilmsQuery.status) {
        case "pending":
            return <Loader />;

        case "success":
            return <FavoritesForm
                favoritesList={favoriteFilmsQuery.data}
                onDelete={handleDelete}
            />;

        case "error":
            return (
                <div>
                    <span>Произошла ошибка: {favoriteFilmsQuery.error.message}</span>
                    <button onClick={() => favoriteFilmsQuery.refetch()}>
                        Повторить запрос
                    </button>
                </div>
            );
    }
}