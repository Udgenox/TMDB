import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleTheme } from "@/features/theme/model/themeSlice";
import { Logo } from "../Logo/Logo";
import { NavLink } from 'react-router';
import { Path } from "@/common/routing";
import s from './Header.module.css';

const navItems = [
    { to: Path.Main, label: 'Main' },
    { to: Path.CategoryMovies, label: 'Category movies' },
    { to: Path.FilteredMovies, label: 'Filtered movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },
];

export const Header = () => {
    const dispatch = useAppDispatch();
    const { isDark } = useAppSelector((state) => state.theme);

    return (
        <header className={s.header}>
            <div className={s.container}>
                <Logo />
                <nav className={s.nav}>

                        {navItems.map((item, index) => (
                            <li key={item.to} className={s.navItem}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `${s.navLink} ${isActive ? s.activeLink : ''}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                                {index < navItems.length - 1 && <span className={s.divider}>|</span>}
                            </li>
                        ))}

                </nav>
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className={s.themeButton}
                    aria-label="Переключить тему"
                >
                    {isDark ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    );
};