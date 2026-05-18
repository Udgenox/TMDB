import {Path} from "@/common/routing";
import {Link} from "react-router";
import s from './Logo.module.css'
import tmdbLogo from '@/common/images/tmdb-logo.svg'

export const Logo = () => {
    return (
        <Link to={Path.Main} className={s.logo}>
            <img
                src={tmdbLogo}
                alt="TMDB"
                className={s.logoImage}
            />
        </Link>
    );
};