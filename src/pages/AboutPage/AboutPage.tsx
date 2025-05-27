import { FetchFilmPreview } from "../../components/FilmPeview/FetchFilmPreview";
import { AboutForm } from "../../components/AboutForm";
import { FC } from "react";

interface AboutProps {
    onClick?: () => void;
}

export const AboutPage:FC<AboutProps> = ({ onClick }) => {
    return (
        <>
            <FetchFilmPreview onCLick={onClick} isMain={false} />
            <AboutForm />
        </>
    )
}