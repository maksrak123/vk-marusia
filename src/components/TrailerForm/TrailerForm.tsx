import YouTube from "react-youtube";
import { Films } from "../../api/types";
import { FC } from "react";
import "./TrailerForm.scss";

interface TrailerFormProps {
    movie: Films;
}

type YouTubePlayerEvent = {
    target: {
        playVideo: () => void;
        pauseVideo: () => void;
        mute: () => void;
        unMute: () => void;
        setVolume: (volume: number) => void;
    };
};

export const TrailerForm: FC<TrailerFormProps> = ({ movie }) => {
    const opts = {
        width: "100%",
        height: "100%",
        playerVars: {
            autoplay: 1,
            controls: 0,
            volume: 0.5,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
        },
    };

    const videoReady = (event: YouTubePlayerEvent) => {
        event.target.mute(); 
        event.target.playVideo();

        setTimeout(() => {
            event.target.unMute();
            event.target.setVolume(50);
        }, 1);
    };

    return (
        <section className="trailer">
            <YouTube
                className="trailer__player"
                videoId={movie.trailerYouTubeId}
                onReady={videoReady}
                opts={opts}
            />
        </section>
    );
};