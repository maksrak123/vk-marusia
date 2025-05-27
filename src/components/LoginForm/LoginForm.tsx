import { FC, FormEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/user";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../../ui/Loader";
import { Input } from "../../ui/Input/Input";
import "./LoginForm.scss";

interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const loginMutation = useMutation(
        {
            mutationFn: () => loginUser(email, password),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                onSuccess?.();
            }
        },
        queryClient
    )

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const errors = {
            email: !email,
            password: !password
        };

        setErrors(errors);

        if (!errors.email && !errors.password) {
            loginMutation.mutate();
        }
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


    return <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__inputs">
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
                hasError={errors.email || !!loginMutation.error}
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
                hasError={errors.email || !!loginMutation.error}
            />
        </div>

        <button className="login-form__button" type="submit">{loginMutation.isPending ? <Loader /> : "Войти"}</button>
    </form>

};
