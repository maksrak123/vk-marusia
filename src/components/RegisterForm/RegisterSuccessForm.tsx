import { FC, FormEventHandler } from "react";
import "./RegisterForm.scss";

interface RegisterSuccessFormProps {
  onSuccess: () => void;
}

export const RegisterSuccessForm: FC<RegisterSuccessFormProps> = ({ onSuccess }) => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSuccess(); 
    }

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="register-form__title">Регистрация завершена</h2>
            <p className="register-form__description">
                Используйте вашу электронную почту для входа
            </p>
            <button className="register-form__button" type="submit">
                Войти
            </button>
        </form>
    );
};
