import { useNavigate } from 'react-router';
import s from './PageNotFound.module.css';

export const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className={s.container}>
            <h1 className={s.title}>404</h1>
            <h2 className={s.subtitle}>Page not found</h2>
            <p className={s.description}>The page you are looking for doesn't exist or has been moved.</p>
            <button className={s.homeButton} onClick={handleGoHome}>
                ← Go to Homepage
            </button>
        </div>
    );
};