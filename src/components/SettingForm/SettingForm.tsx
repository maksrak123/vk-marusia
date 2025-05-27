import { useAuth } from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { stopAutorization } from "../../api/user";
import { useNavigate } from "react-router-dom";
import EmailIcon from "../../assets/email.svg";
import "./SettingForms.scss";

export const SettingForm = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();

    const logoutMutation = useMutation(
        {
            mutationFn: () => stopAutorization(),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["profile"] });
            },
            retry: 0
        },
        queryClient
    )

    const handleSubmit = () => {
        logoutMutation.mutate();
        navigate("/");
    }

    return (
        <section className="setting">
            <ul className="setting__list">
                <li className="setting__user">
                    <div className="setting__img">{profile?.name[0].toUpperCase()}{profile?.surname[0].toUpperCase()}</div>
                    <div className="setting__description--block">
                        <p className="setting__title">Имя Фамилия</p>
                        <p className="setting__name">{profile?.name} {profile?.surname}</p>
                    </div>
                </li>
                <li className="setting__user">
                    <div className="setting__img"><img src={EmailIcon} alt="" /></div>
                    <div className="setting__description--block">
                        <p className="setting__title">Электронная почта</p>
                        <p className="setting__name">{profile?.email}</p>
                    </div>
                </li>
            </ul>
            <button className="setting__button" onClick={handleSubmit}>Выйти из аккаунта</button>
        </section>
    );
}