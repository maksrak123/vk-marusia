import { FC } from "react";
import ExitIcon from "../../assets/cross.svg";
import "./ExitButton.scss";

interface ExipButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className: string;
}

export const ExitButton: FC<ExipButtonProps> = ({ onClick, className }) => {
    return (
        <button 
            className={"exit-button " + className}
            onClick={onClick}
        >
            <img src={ExitIcon} alt="" />
        </button>
    )
}