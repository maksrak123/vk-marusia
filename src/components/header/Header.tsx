import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SearchField } from "../../ui/SearchField/SearchField";
import Logo from "../../assets/marusya-white.svg";
import User from "../../assets/user.svg";
import { useAuth } from "../../hooks/useAuth";
import { DropdownFilms } from "../DropdownFilms/DropdownFilms";
import "./Header.scss";

interface HeaderProps {
    onAccountClick?: () => void;
}

export const Header: FC<HeaderProps> = ({ onAccountClick }) => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearchField, setShowSearchField] = useState(false);
    const { isAuthenticated, profile } = useAuth();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        setShowDropdown(value.length > 0);
    };

    const handleDropdownCLick = () => {
        setSearchQuery('');
        setShowDropdown(false);
    }

    const handleSearchClick = () => {
        setShowSearchField(true);
    }

    const handleExitClick = () => {
        setSearchQuery('');
        setShowDropdown(false);
    }

    const handleExitClickMedia = () => {
        handleExitClick();
        setShowSearchField(false);
    }

    return (
        <header className="header">
            <nav className="header__navigate">
                <Link to={"/"} className={showSearchField ? "none" : "header__logo"}><img src={Logo} /></Link>
                <Link to={"/"} className="header__link">Главная</Link>
                <Link to={"/genres"} className="header__link">Жанры</Link>
                <Link to={"/genres"} className={showSearchField ? "none" : "header__link--media"}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7C11.5 9.48528 9.48528 11.5 7 11.5ZM7 21.5C4.51472 21.5 2.5 19.4853 2.5 17C2.5 14.5147 4.51472 12.5 7 12.5C9.48528 12.5 11.5 14.5147 11.5 17C11.5 19.4853 9.48528 21.5 7 21.5ZM17 11.5C14.5147 11.5 12.5 9.48528 12.5 7C12.5 4.51472 14.5147 2.5 17 2.5C19.4853 2.5 21.5 4.51472 21.5 7C21.5 9.48528 19.4853 11.5 17 11.5ZM17 21.5C14.5147 21.5 12.5 19.4853 12.5 17C12.5 14.5147 14.5147 12.5 17 12.5C19.4853 12.5 21.5 14.5147 21.5 17C21.5 19.4853 19.4853 21.5 17 21.5ZM7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5ZM7 19.5C8.38071 19.5 9.5 18.3807 9.5 17C9.5 15.6193 8.38071 14.5 7 14.5C5.61929 14.5 4.5 15.6193 4.5 17C4.5 18.3807 5.61929 19.5 7 19.5ZM17 9.5C18.3807 9.5 19.5 8.38071 19.5 7C19.5 5.61929 18.3807 4.5 17 4.5C15.6193 4.5 14.5 5.61929 14.5 7C14.5 8.38071 15.6193 9.5 17 9.5ZM17 19.5C18.3807 19.5 19.5 18.3807 19.5 17C19.5 15.6193 18.3807 14.5 17 14.5C15.6193 14.5 14.5 15.6193 14.5 17C14.5 18.3807 15.6193 19.5 17 19.5Z" fill="white" />
                    </svg>
                </Link>
            </nav>

            <div className="header__search-wrapper">
                <SearchField
                    query={searchQuery}
                    onChange={handleSearchChange}
                    onClick={handleExitClick}
                />
                {showDropdown && (
                    <div className="header__dropdown-container">
                        <DropdownFilms title={searchQuery} onClick={handleDropdownCLick} />
                    </div>
                )}
            </div>

            <div className="header__search-wrapper--media">
                {!showSearchField &&
                    <button className="header__search--button" onClick={handleSearchClick}>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.3591 14.6168L20.6418 18.8995L19.2276 20.3137L14.9449 16.031C13.405 17.263 11.4521 18 9.32812 18C4.36013 18 0.328125 13.968 0.328125 9C0.328125 4.032 4.36013 0 9.32812 0C14.2961 0 18.3281 4.032 18.3281 9C18.3281 11.124 17.5911 13.0769 16.3591 14.6168ZM14.3528 13.8748C15.5756 12.6146 16.3281 10.8956 16.3281 9C16.3281 5.1325 13.1956 2 9.32812 2C5.46062 2 2.32812 5.1325 2.32812 9C2.32812 12.8675 5.46062 16 9.32812 16C11.2237 16 12.9427 15.2475 14.2029 14.0247L14.3528 13.8748Z" fill="white" fill-opacity="0.5" />
                        </svg>
                    </button>
                }
                {showSearchField &&
                    <SearchField
                        query={searchQuery}
                        onChange={handleSearchChange}
                        onClick={handleExitClickMedia}
                    />
                }
                {showDropdown && (
                    <div className="header__dropdown-container--media">
                        <DropdownFilms title={searchQuery} onClick={handleDropdownCLick} />
                    </div>
                )}
            </div>

            {isAuthenticated ? (
                <>
                    <Link to={"/favorites"} className="header__button">{profile?.name}</Link>
                    <Link to={"/favorites"} className="header__button--media"><img src={User} alt="" /></Link>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className="header__button"
                        onClick={onAccountClick}
                    >
                        Войти
                    </button>
                    <button
                        type="button"
                        className="header__button--media"
                        onClick={onAccountClick}
                    >
                        <img src={User} alt="" />
                    </button>
                </>
            )
            }

        </header >
    );
}