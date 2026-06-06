import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import s from './MovieSkeleton.module.css';

export const MovieSkeleton = () => {
    return (
        <div className={s.card}>
            <div className={s.poster}>
                <Skeleton height="100%" />
            </div>
            <div className={s.title}>
                <Skeleton width="100%" />
            </div>
        </div>
    );
};