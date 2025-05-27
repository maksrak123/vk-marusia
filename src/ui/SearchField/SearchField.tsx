import React, { FC } from "react";
import SearchIcon from "../../assets/search.svg";
import Exit from "../../assets/exitbtn.svg";
import "./SearchField.scss";

type SearchFieldProps = {
    query: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onClick: () => void;
}

export const SearchField: FC<SearchFieldProps> = ({ query, onChange, onClick }) => {

    return (
        <search className="search">
            <form className="search__form">
                <button className="search__button" type="submit">
                    <img src={SearchIcon} alt="Поиск" />
                </button>
                <input
                    className="search__input"
                    type="search"
                    value={query}
                    onChange={onChange}
                    placeholder="Поиск"
                />
                {query.length > 0 && (
                    <button 
                        className="search__exit" 
                        type="button" 
                        onClick={onClick}
                    >
                        <img src={Exit} alt="Очистить" />
                    </button>
                )}
            </form>
        </search>
    )
}