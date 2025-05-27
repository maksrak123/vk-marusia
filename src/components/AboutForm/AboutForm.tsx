import "./AboutForm.scss";
import { useLocation } from "react-router-dom";

export const AboutForm = () => {
    const location = useLocation();
    const movie = location.state;

    return (
        <section className="about">
            <h2 className="about__title">О фильме</h2>
            <ul className="about__list">
                <li className="about__item">
                    <div className="about__description--block">
                        <span className="about__description">Язык&nbsp;оригинала</span>
                        <span className="about__border"></span>
                    </div>
                    <span className="about__value">{movie.language ?? "нет информации"}</span>
                </li>
                <li className="about__item">
                    <div className="about__description--block">
                        <span className="about__description">Бюджет</span>
                        <span className="about__border"></span>
                    </div>
                    <span className="about__value">{movie.budget ?? "нет информации"}</span>
                </li>
                <li className="about__item">
                    <div className="about__description--block">
                        <span className="about__description">Выручка</span>
                        <span className="about__border"></span>
                    </div>
                    <span className="about__value">{movie.revenue ?? "нет информации"}</span>
                </li>
                <li className="about__item">
                    <div className="about__description--block">
                        <span className="about__description">Режиссёр</span>
                        <span className="about__border"></span>
                    </div>
                    <span className="about__value">{movie.director ?? "нет информации"}</span>
                </li>
                <li className="about__item">
                    <div className="about__description--block">
                        <span className="about__description">Продакшен</span>
                        <span className="about__border"></span>
                    </div>
                    <span className="about__value">{movie.production ?? "нет информации"}</span>
                </li>
                <li className="about__item">
                    <div className="about__description--block">
                        <span className="about__description">Награды</span>
                        <span className="about__border"></span>
                    </div>
                    <span className="about__value">{movie.awardsSummary ?? "нет информации"}</span>
                </li>
            </ul>
        </section>
    )
}