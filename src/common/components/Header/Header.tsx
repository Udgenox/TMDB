import {Logo} from "@/common/components";
import { NavLink } from 'react-router';
import { Path } from "@/common/routing";
import s from './Header.module.css';

type ThemeProps = {
    isDark: boolean;
    setIsDark: (value: boolean) => void;
};

const navItems = [
    { to: Path.Main, label: 'Main' },
    { to: Path.CategoryMovies, label: 'Category movies' },
    { to: Path.FilteredMovies, label: 'Filtered Movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },
];

export const Header = ({ isDark, setIsDark }: ThemeProps) => {
    return (
        <header className={s.container}>
            <Logo />
            <nav>
                <ul className={s.list}>
                    {navItems.map(item => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => `link ${isActive ? s.activeLink : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <button
                onClick={() => setIsDark(!isDark)}
                className={s.themeButton}
                aria-label="Переключить тему"
            >
                {isDark ? '☀️' : '🌙'}
            </button>
        </header>
    );
};