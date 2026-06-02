import {useAppSelector} from "@/app/store";
import {MovieCard} from "@/common/components/MovieCard/MovieCard";
import s from './FavoritesPage.module.css';

export const FavoritesPage = () => {
    const favorites = useAppSelector((state) => state.favorites.items);

    return (
        <div className={s.container}>
            <h1 className={s.pageTitle}>My Favorite Movies</h1>

            {favorites.length === 0 ? (
                <div className={s.emptyState}>
                    <p>You haven't added any favorite movies yet.</p>
                    <p>Click the heart icon ❤️ on any movie to add it to favorites.</p>
                </div>
            ) : (
                <div className={s.moviesGrid}>
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            posterPath={movie.posterPath}
                            voteAverage={movie.voteAverage}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
