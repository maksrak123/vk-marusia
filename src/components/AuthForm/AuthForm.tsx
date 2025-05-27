import { useState } from "react";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";
import { ExitButton } from "../../ui/ExitButton";
import MarusyaIcon from "../../assets/marusya.png";
import "./AuthForm.scss";

interface AuthFormProps {
    onClose: () => void;
}

export const AuthForm = ({ onClose }: AuthFormProps) => {
    const [authType, setAuthType] = useState<string>("register");
    const [showSwitchButton, setShowSwitchButton] = useState(true);

    const handleClick = () => {
        setAuthType(prev => prev === "register" ? "auth" : "register");
        setShowSwitchButton(true);
    };

    const handleRegisterSuccess = () => {
        setShowSwitchButton(false);
    };

    const handleLoginRedirect = () => {
        setAuthType("auth");
        setShowSwitchButton(true);
    };

    return (
        <div className="auth-modal">
            <div className="auth-modal__overlay"></div>
            <div className="auth-modal__form">
                <article className="auth-modal__field">
                    <img src={MarusyaIcon} className="auth-modal__title" />
                    {authType === "register" ? (
                        <RegisterForm
                            onRegisterSuccess={handleRegisterSuccess}
                            onLoginRedirect={handleLoginRedirect}
                        />
                    ) : (
                        <LoginForm onSuccess={onClose}/>
                    )}

                    {showSwitchButton ? (
                        <button className="auth-modal__button" onClick={handleClick}>
                            {authType === "register" ? "У меня есть пароль" : "Регистрация"}
                        </button>
                    ) : null}

                </article>
                <ExitButton className="auth-modal__exit" onClick={onClose} />
            </div>
        </div>

    );
};
