import {useAppDispatch, useAppSelector} from "@/app/store";
import {Logo} from "@/common/components";
import {toggleTheme} from "@/features/theme/model/themeSlice";
import { NavLink } from 'react-router';
import { Path } from "@/common/routing";
import s from './Header.module.css';


const navItems = [
    { to: Path.Main, label: 'Main' },
    { to: Path.CategoryMovies, label: 'Category movies' },
    { to: Path.FilteredMovies, label: 'Filtered Movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },
];

export const Header = () => {
    const dispatch = useAppDispatch();
    const { isDark } = useAppSelector((state) => state.theme);

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
                onClick={() => dispatch(toggleTheme())}
                className={s.themeButton}
                aria-label="Переключить тему"
            >
                {isDark ? '☀️' : '🌙'}
            </button>
        </header>
    );
};