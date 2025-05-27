import { FetchFilmPreview } from "../../components/FilmPeview/FetchFilmPreview";
import { FetchTop10Films } from "../../components/Top10Films/FetchTop10Films";
import { FC } from "react";

interface MainProps {
    onClick?: () => void;
}

export const MainPage: FC<MainProps> = ({ onClick }) => {
    return (
        <>
            <FetchFilmPreview onCLick={onClick} isMain={true} />
            <FetchTop10Films />
        </>
    )
}