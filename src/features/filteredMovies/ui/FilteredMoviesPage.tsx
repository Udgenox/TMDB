
import {useDiscoverMoviesQuery} from "@/app/api/tmdbApi";
import { MovieCard } from '@/common/components/MovieCard/MovieCard';
import { FilterSidebar } from './FilterSidebar';
import { MoviesGridSkeleton } from '@/common/components/Skeletons';   // 🔵 НОВОЕ: импорт скелетона
import { useFilters } from '../model/useFilters';
import s from './FilteredMoviesPage.module.css';

export const FilteredMoviesPage = () => {
    const {
        sortBy,
        ratingMin,
        ratingMax,
        selectedGenres,
        currentPage,
        debouncedRatingMin,
        debouncedRatingMax,
        setSortBy,
        setRatingMin,
        setRatingMax,
        toggleGenre,
        setPage,
        resetFilters,
    } = useFilters();

    const withGenres = selectedGenres.length > 0 ? selectedGenres.join(',') : undefined;

    const { data, isLoading, isFetching } = useDiscoverMoviesQuery({
        page: currentPage,
        sort_by: sortBy,
        with_genres: withGenres,
        'vote_average.gte': debouncedRatingMin > 0 ? debouncedRatingMin : undefined,
        'vote_average.lte': debouncedRatingMax < 10 ? debouncedRatingMax : undefined,
    });

    const totalPages = Math.min(data?.total_pages || 1, 500);
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className={s.container}>
            <div className={s.twoColumns}>
                <aside className={s.sidebarColumn}>
                    <FilterSidebar
                        sortBy={sortBy}
                        ratingMin={ratingMin}
                        ratingMax={ratingMax}
                        selectedGenres={selectedGenres}
                        onSortChange={setSortBy}
                        onRatingMinChange={setRatingMin}
                        onRatingMaxChange={setRatingMax}
                        onGenreToggle={toggleGenre}
                        onReset={resetFilters}
                    />
                </aside>

                <div className={s.contentColumn}>
                    <h1 className={s.pageTitle}>Filtered Movies</h1>

                    {/* ✅ ИЗМЕНЕНО: вместо текста "Loading..." теперь показывается скелетон */}
                    {isLoading ? (
                        <MoviesGridSkeleton count={20} />   // 🔵 НОВОЕ: скелетон сетки фильмов (20 карточек)
                    ) : (
                        data?.results && data.results.length > 0 ? (
                            <>
                                <div className={s.moviesGrid}>
                                    {data.results.map((movie) => (
                                        <MovieCard
                                            key={movie.id}
                                            id={movie.id}
                                            title={movie.title}
                                            posterPath={movie.poster_path}
                                            voteAverage={movie.vote_average}
                                        />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className={s.pagination}>
                                        <button
                                            className={s.pageButton}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            ← Previous
                                        </button>
                                        <div className={s.pageNumbers}>
                                            <button
                                                className={`${s.pageNumber} ${currentPage === 1 ? s.activePage : ''}`}
                                                onClick={() => handlePageChange(1)}
                                            >
                                                1
                                            </button>
                                            {totalPages >= 2 && (
                                                <button
                                                    className={`${s.pageNumber} ${currentPage === 2 ? s.activePage : ''}`}
                                                    onClick={() => handlePageChange(2)}
                                                >
                                                    2
                                                </button>
                                            )}
                                            {totalPages > 3 && <span className={s.dots}>...</span>}
                                            {totalPages > 2 && (
                                                <button
                                                    className={`${s.pageNumber} ${currentPage === totalPages ? s.activePage : ''}`}
                                                    onClick={() => handlePageChange(totalPages)}
                                                >
                                                    {totalPages}
                                                </button>
                                            )}
                                        </div>
                                        <button
                                            className={s.pageButton}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className={s.emptyState}>No movies found with selected filters</div>
                        )
                    )}

                    {isFetching && !isLoading && <div className={s.fetching}>Updating...</div>}
                </div>
            </div>
        </div>
    );
};