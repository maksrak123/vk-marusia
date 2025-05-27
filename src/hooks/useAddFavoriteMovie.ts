import { useQueryClient } from "@tanstack/react-query"
import { addFavoriteFilm, deleteFavoriteFilm } from "../api/favorites";
import { useMutation } from "@tanstack/react-query";
// import { User } from "../api/types";

export const useFavoriteMovies = () => {
  const queryClient = useQueryClient();

  const addToFavorites = useMutation<void, Error, string>({
    mutationFn: addFavoriteFilm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });

  const removeFromFavorites = useMutation<boolean, Error, string>({
    mutationFn: deleteFavoriteFilm,
    onSuccess: (success) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
      }
    }
  });

  return {
    addToFavorites,
    removeFromFavorites
  };
};