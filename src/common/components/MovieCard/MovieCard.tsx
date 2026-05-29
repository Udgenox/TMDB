import {useNavigate} from "react-router";
import s from './MovieCard.module.css'

export type MovieCardProps = {
    id: number;
    title: string;
    posterPath: string | null;
    voteAverage: number;
};


const getRatingColor = (rating: number): string => {
    if (rating >= 8) return s.ratingGreen;
    if (rating >= 5) return s.ratingYellow;
    return s.ratingRed;
}

export const MovieCard = ({ id, title, posterPath, voteAverage }: MovieCardProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className={s.movieCard} onClick={handleClick}>
            <div className={s.posterWrapper}>
                {posterPath ? (
                    <>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                            alt={title}
                            className={s.poster}
                        />
                        <div className={`${s.ratingBadge} ${getRatingColor(voteAverage)}`}>
                            <span className={s.ratingValue}>{voteAverage.toFixed(1)}</span>
                        </div>
                    </>
                ) : (
                    <div className={s.posterPlaceholder}>
                        <span>No poster</span>
                    </div>
                )}
            </div>
            <h3 className={s.movieTitle}>{title}</h3>
        </div>
    );
}