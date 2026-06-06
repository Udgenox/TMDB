import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import s from './ActorsGridSkeleton.module.css';

type Props = {
    count?: number;
};

export const ActorsGridSkeleton = ({ count = 6 }: Props) => {
    return (
        <div className={s.grid}>
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className={s.card}>
                        <div className={s.photo}>
                            <Skeleton height="100%" />
                        </div>
                        <div className={s.info}>
                            <Skeleton width="80%" />
                            <Skeleton width="60%" />
                        </div>
                    </div>
                ))}
        </div>
    );
};