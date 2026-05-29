import {MovieCard} from "@/common/components/MovieCard/MovieCard";
import s from './MovieSection.module.css';

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
};

type MovieSectionProps = {
    title: string;
    movies: Movie[];
    onViewMore?: () => void;
};

export const MovieSection = ({ title, movies, onViewMore }: MovieSectionProps) => {
    // Берём только первые 6 фильмов
    const displayMovies = movies.slice(0, 6);

    return (
        <section className={s.section}>
            <div className={s.sectionHeader}>
                <h2 className={s.sectionTitle}>{title}</h2>
                {onViewMore && (
                    <button className={s.viewMoreButton} onClick={onViewMore}>
                        View More →
                    </button>
                )}
            </div>
            <div className={s.moviesGrid}>
                {displayMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        voteAverage={movie.vote_average}
                    />
                ))}
            </div>
        </section>
    );
};