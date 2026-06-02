import {useAppDispatch, useAppSelector} from "@/app/store";
import {toggleFavorite} from "@/features/favorites/model";
import type {FavoriteMovie} from "@/features/favorites/model/favoritesSlice";

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
    const dispatch = useAppDispatch()

    // Проверяем, в избранном ли фильм
    const isFavorite = useAppSelector((state) =>
        state.favorites.items.some(item => item.id === id)
    );

    const handleClick = () => {
        navigate(`/movie/${id}`);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        const favoriteMovie: FavoriteMovie = {
            id,
            title,
            posterPath,
            voteAverage,
        };

        dispatch(toggleFavorite(favoriteMovie));
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
                        {/* Кнопка "Любимые" */}
                        <button
                            className={`${s.favoriteButton} ${isFavorite ? s.favoriteActive : ''}`}
                            onClick={handleFavoriteClick}
                            aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                        >
                            {isFavorite ? '❤️' : '🤍'}
                        </button>
                    </>
                ) : (
                    <div className={s.posterPlaceholder}>
                        <span>No poster</span>
                        {/* Кнопка "Любимые" */}
                        <button
                            className={`${s.favoriteButton} ${isFavorite ? s.favoriteActive : ''}`}
                            onClick={handleFavoriteClick}
                        >
                            {isFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                )}
            </div>
            <h3 className={s.movieTitle}>{title}</h3>
        </div>
    );
}