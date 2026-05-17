
import {Path} from "@/common/routing";
import { NavLink } from 'react-router'
import s from './Header.module.css'

const navItems = [
    { to: Path.Main, label: 'Main' },
    { to: Path.CategoryMovies, label: 'Category movies' },
    { to: Path.FilteredMovies, label: 'Filtered Movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },
]

export const Header = () => {
    return (
        <header className={s.container}>
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
        </header>
    )
}