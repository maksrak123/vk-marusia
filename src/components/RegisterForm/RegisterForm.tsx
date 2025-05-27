import { FC, FormEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/user";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../../ui/Loader";
import { Input } from "../../ui/Input/Input";
import { RegisterSuccessForm } from "./RegisterSuccessForm";
import "./RegisterForm.scss";

interface RegisterFormProps {
    onRegisterSuccess: () => void;
    onLoginRedirect: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onRegisterSuccess, onLoginRedirect }) => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [name, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errors, setErrors] = useState({
        name: false,
        surname: false,
        password: false,
        repeatPassword: false,
        mismatch: false
    });

    const registerMutation = useMutation(
        {
            mutationFn: () => registerUser(email, name, surname, password),
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ["profile"] });
                setIsRegistered(true);
                onRegisterSuccess();
            }
        },
        queryClient
    )

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const newErrors = {
            name: !name,
            surname: !surname,
            password: !password,
            repeatPassword: !repeatPassword,
            mismatch: password !== repeatPassword
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            return;
        }

        registerMutation.mutate();
    }

    const EmailIcon = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="black" fill-opacity="0.4" />
        </svg>
    );

    const PasswordIcon = (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.917 13.75C12.441 16.5877 9.973 18.75 7 18.75C3.68629 18.75 1 16.0637 1 12.75C1 9.43629 3.68629 6.75 7 6.75C9.973 6.75 12.441 8.91229 12.917 11.75H23V13.75H21V17.75H19V13.75H17V17.75H15V13.75H12.917ZM7 16.75C9.20914 16.75 11 14.9591 11 12.75C11 10.5409 9.20914 8.75 7 8.75C4.79086 8.75 3 10.5409 3 12.75C3 14.9591 4.79086 16.75 7 16.75Z" fill="black" fill-opacity="0.4" />
        </svg>
    );

    const UserIcon = (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22.75C4 18.3317 7.58172 14.75 12 14.75C16.4183 14.75 20 18.3317 20 22.75H18C18 19.4363 15.3137 16.75 12 16.75C8.68629 16.75 6 19.4363 6 22.75H4ZM12 13.75C8.685 13.75 6 11.065 6 7.75C6 4.435 8.685 1.75 12 1.75C15.315 1.75 18 4.435 18 7.75C18 11.065 15.315 13.75 12 13.75ZM12 11.75C14.21 11.75 16 9.96 16 7.75C16 5.54 14.21 3.75 12 3.75C9.79 3.75 8 5.54 8 7.75C8 9.96 9.79 11.75 12 11.75Z" fill="black" fill-opacity="0.4" />
        </svg>
    );

    return (
        <>
            {isRegistered ? (
                <RegisterSuccessForm onSuccess={onLoginRedirect} />
            ) : (
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2 className="register-form__title">Регистрация</h2>
                    <div className="register-form__inputs">
                        <Input
                            type="email"
                            name="email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setErrors(prev => ({ ...prev, name: false }));
                            }}
                            placeholder="Электронная почта"
                            value={email}
                            icon={EmailIcon}
                            hasError={errors.name || !!registerMutation.error}
                        />
                        <Input
                            type="text"
                            name="name"
                            onChange={(event) => {
                                setUsername(event.target.value);
                                setErrors(prev => ({ ...prev, name: false }));
                            }}
                            placeholder="Имя"
                            value={name}
                            icon={UserIcon}
                            hasError={errors.name || !!registerMutation.error}
                        />
                        <Input
                            type="text"
                            name="surname"
                            onChange={(event) => {
                                setSurname(event.target.value);
                                setErrors(prev => ({ ...prev, name: false }));
                            }}
                            placeholder="Фамилия"
                            value={surname}
                            icon={UserIcon}
                            hasError={errors.name || !!registerMutation.error}
                        />
                        <Input
                            type="password"
                            name="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setErrors(prev => ({ ...prev, name: false }));
                            }}
                            placeholder="Пароль"
                            value={password}
                            icon={PasswordIcon}
                            hasError={errors.name || !!registerMutation.error}
                        />
                        <Input
                            type="password"
                            name="password"
                            onChange={(event) => {
                                setRepeatPassword(event.target.value);
                                setErrors(prev => ({ ...prev, name: false }));
                            }}
                            placeholder="Подтвердите пароль"
                            value={repeatPassword}
                            icon={PasswordIcon}
                            hasError={errors.name || !!registerMutation.error}
                        />
                    </div>

                    <button className="register-form__button" type="submit">{registerMutation.isPending ? <Loader /> : "Создать аккаунт"}</button>
                </form>
            )}
        </>
    );
};
