import { FC, ReactNode } from "react";
import "./Input.scss";

export interface InputProps {
    type: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    placeholder: string;
    icon: ReactNode; 
    hasError?: boolean;
}

export const Input: FC<InputProps> = ({
    type,
    name,
    onChange,
    value,
    placeholder,
    icon,
    hasError = false
}) => {
    return (
        <div className="input">
            <span className={`input__icon ${hasError ? 'input--icon--error' : ''}`}>{icon}</span>
            <input
                type={type}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                className={`input__item ${hasError ? 'input--error' : ''}`}
            />
        </div>
    );
};