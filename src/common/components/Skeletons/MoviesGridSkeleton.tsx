import { MovieSkeleton } from './MovieSkeleton';
import s from './MoviesGridSkeleton.module.css';

type Props = {
    count?: number;
};

export const MoviesGridSkeleton = ({ count = 6 }: Props) => {
    return (
        <div className={s.grid}>
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <MovieSkeleton key={i} />
                ))}
        </div>
    );
};