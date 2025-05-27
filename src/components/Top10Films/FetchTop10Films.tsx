import { useQuery } from "@tanstack/react-query";
import { fetchMovieTop10 } from "../../api/movies";
import { Loader } from "../../ui/Loader";
import { Top10Films } from "./Top10Films";

export const FetchTop10Films = () => {
    const top10MovieQuery = useQuery(
        {
            queryFn: () => fetchMovieTop10(),
            queryKey: ["top10"],
            retry: 1,
            refetchOnWindowFocus: false,
        },
    );


    switch (top10MovieQuery.status) {
        case "pending":
            return <Loader />;

        case "success":
            return <Top10Films
                filmsList={top10MovieQuery.data}
            />

        case "error":
            return (
                <div>
                    <span>Произошла ошибка{top10MovieQuery.error.message}</span>


                    <button onClick={() => top10MovieQuery.refetch()}>Повторить запрос</button>
                </div>
            );
    }
}

