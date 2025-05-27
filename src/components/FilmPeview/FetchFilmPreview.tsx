import { useQuery } from "@tanstack/react-query";
import { fetchRandomMovie } from "../../api/movies";
import { Loader } from "../../ui/Loader";
import { FilmPreview } from "./FilmPreview";
import { FC, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Films } from "../../api/types";

interface FilmPreviewProps {
    onCLick?: () => void;
    isMain: boolean;
}

export const FetchFilmPreview: FC<FilmPreviewProps> = ({ onCLick, isMain }) => {
    const location = useLocation();
    const movie = location.state;
    const [randomMovie, setRandomMovie] = useState<Films>();

    const randomMovieQuery = useQuery(
        {
            queryFn: () => fetchRandomMovie(),
            queryKey: ["random"],
            retry: 1,
            refetchOnWindowFocus: false,
        },
    );

    useEffect(() => {
        const savedMovie = localStorage.getItem("randomMovie");
        if (savedMovie) {
            setRandomMovie(JSON.parse(savedMovie));
        }
    }, []);

    const selectRandomMovie = useCallback(async () => {
        const { data } = await randomMovieQuery.refetch();
        if (data) {
            setRandomMovie(data);
            localStorage.setItem("randomMovie", JSON.stringify(data));
        }
    }, [randomMovieQuery]);

    
    
    switch (randomMovieQuery.status) {
        case "pending":
            return <Loader />;
    
        case "success":
            return isMain ? (
                <FilmPreview 
                    movie={randomMovie || randomMovieQuery.data}
                    onRandomClick={selectRandomMovie}
                    onFavoritesCLick={onCLick}
                    isMainForm={isMain}
                />
            ) : (
                <FilmPreview 
                    movie={movie}
                    onRandomClick={selectRandomMovie}
                    onFavoritesCLick={onCLick}
                    isMainForm={isMain}
                />
            );
    
        case "error":
                return (
                    <div>
                        <span>Произошла ошибка{randomMovieQuery.error.message}</span>
                        
    
                        <button onClick={() => randomMovieQuery.refetch()}>Повторить запрос</button>
                    </div>
                );
        }
}


