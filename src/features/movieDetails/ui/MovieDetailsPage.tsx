import {useGetMovieCreditsQuery, useGetMovieDetailsQuery, useGetSimilarMoviesQuery} from "@/app/api/tmdbApi";
import {MovieCard} from "@/common/components/MovieCard/MovieCard";
import {ActorsGridSkeleton, MoviesGridSkeleton} from "@/common/components/Skeletons";
import {ActorCard} from "@/features/movieDetails/ui/ActorCard";
import {useNavigate, useParams} from "react-router";
import s from './MovieDetailsPage.module.css'

const getRatingColor = (rating: number): string => {
    if (rating >= 7) return s.ratingGreen;
    if (rating >= 5) return s.ratingYellow;
    return s.ratingRed;
};

export const MovieDetailsPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const movieId = parseInt(id || '0');

    const {data: movie, isLoading: movieLoading, error: movieError} = useGetMovieDetailsQuery(movieId, {
        skip: !movieId,
    });
    const {data: credits, isLoading: creditsLoading} = useGetMovieCreditsQuery(movieId, {
        skip: !movieId,
    });
    const {data: similar, isLoading: similarLoading} = useGetSimilarMoviesQuery(
        {movieId, page: 1},
        {skip: !movieId}
    );

    const handleGoBack = () => {
        navigate(-1); // Возврат на предыдущую страницу
    };

    if (movieLoading) {
        return (
            <div className={s.loading}>
                <div className={s.spinner}></div>
                <p>Loading movie details...</p>
            </div>
        );
    }

    if (movieError || !movie) {
        return (
            <div className={s.error}>
                <h2>Error loading movie</h2>
                <p>Please try again later.</p>
                <button className={s.backButton} onClick={handleGoBack}>
                    ← Go Back
                </button>
            </div>
        );
    }

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const topActors = credits?.cast?.slice(0, 6) || [];
    const similarMovies = similar?.results?.slice(0, 6) || [];

    return (
        <div className={s.container}>
            {/* Кнопка "Назад" */}
            <button className={s.backButtonTop} onClick={handleGoBack}>
                ← Back
            </button>

            {/* Блок 1: Информация о фильме */}
            <div className={s.movieHeader}>
                <div className={s.posterWrapper}>
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className={s.poster}
                        />
                    ) : (
                        <div className={s.posterPlaceholder}>
                            <span>No poster</span>
                        </div>
                    )}
                </div>

                <div className={s.movieInfo}>
                    <h1 className={s.movieTitle}>{movie.title}</h1>

                    <div className={s.movieMeta}>
                        <span className={s.year}>{releaseYear}</span>
                        <span className={s.runtime}>{movie.runtime} min</span>
                        {/* Кружок с рейтингом */}
                        <div className={`${s.ratingBadge} ${getRatingColor(movie.vote_average)}`}>
                            <span className={s.ratingValue}>{movie.vote_average.toFixed(1)}</span>
                        </div>
                    </div>

                    <div className={s.genres}>
                        {movie.genres.map((genre) => (
                            <span key={genre.id} className={s.genreTag}>
                {genre.name}
              </span>
                        ))}
                    </div>

                    <div className={s.overview}>
                        <h3>Overview</h3>
                        <p>{movie.overview || 'No description available.'}</p>
                    </div>
                </div>
            </div>

            {/* Блок 2: Актеры */}
            <div className={s.section}>
                <h2 className={s.sectionTitle}>Top Cast</h2>
                {creditsLoading ? (
                    <ActorsGridSkeleton count={6}/>
                ) : (
                    topActors.length > 0 ? (
                        <div className={s.actorsGrid}>
                            {topActors.map((actor) => (
                                <ActorCard
                                    key={actor.id}
                                    name={actor.name}
                                    character={actor.character}
                                    profilePath={actor.profile_path}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className={s.noData}>No cast information available.</p>
                    )
                )}
            </div>

            {/* Блок 3: Похожие фильмы */}
            <div className={s.section}>
                <h2 className={s.sectionTitle}>Similar Movies</h2>
                {similarLoading ? (
                    <MoviesGridSkeleton count={6}/>
                ) : (
                    similarMovies.length > 0 ? (
                        <div className={s.similarGrid}>
                            {similarMovies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    posterPath={movie.poster_path}
                                    voteAverage={movie.vote_average}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className={s.noData}>No similar movies found.</p>
                    )
                )}
            </div>
        </div>
    );
};
