
import {useSearchMoviesQuery} from "@/app/api";
import {MoviesGridSkeleton} from "@/common/components/Skeletons";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import s from './SearchPage.module.css'

export const SearchPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryFromUrl = searchParams.get('query') || '';
    const pageFromUrl = parseInt(searchParams.get('page') || '1');

    const [searchInput, setSearchInput] = useState(queryFromUrl);
    const [currentQuery, setCurrentQuery] = useState(queryFromUrl);
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    const { data, isLoading, error } = useSearchMoviesQuery(
        { query: currentQuery, page: currentPage },
        { skip: !currentQuery }
    );

    useEffect(() => {
        setSearchInput(queryFromUrl);
        setCurrentQuery(queryFromUrl);
        setCurrentPage(pageFromUrl);
    }, [queryFromUrl, pageFromUrl]);

    const handleSearch = () => {
        if (searchInput.trim()) {
            setCurrentQuery(searchInput.trim());
            setCurrentPage(1);
            setSearchParams({ query: searchInput.trim(), page: '1' });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchInput.trim()) {
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearchInput('');
        setCurrentQuery('');
        setCurrentPage(1);
        setSearchParams({});
        navigate('/search');
    };

    const handleMovieClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= (data?.total_pages || 1)) {
            setCurrentPage(page);
            setSearchParams({ query: currentQuery, page: page.toString() });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getRatingColor = (rating: number): string => {
        if (rating >= 8) return s.ratingGreen;
        if (rating >= 5) return s.ratingYellow;
        return s.ratingRed;
    };

    // Состояние 1: Нет запроса
    if (!currentQuery) {
        return (
            <div className={s.container}>
                <h1 className={s.pageTitle}>Search Results</h1>

                <div className={s.searchSection}>
                    <div className={s.searchBox}>
                        <div className={s.inputWrapper}>
                            <input
                                type="text"
                                className={s.searchInput}
                                placeholder="Search for a movie"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {searchInput && (
                                <button className={s.clearButton} onClick={handleClear}>
                                    ✕
                                </button>
                            )}
                        </div>
                        <button
                            className={s.searchButton}
                            onClick={handleSearch}
                            disabled={!searchInput.trim()}
                        >
                            Search
                        </button>
                    </div>
                    <div className={s.emptyState}>
                        <p>Enter a movie title to start searching</p>
                    </div>
                </div>
            </div>
        );
    }

    // Состояние 2: Загрузка
    if (isLoading) {
        return (
            <div className={s.container}>
                <h1 className={s.pageTitle}>Search Results</h1>

                <div className={s.searchSection}>
                    <div className={s.searchBox}>
                        <div className={s.inputWrapper}>
                            <input
                                type="text"
                                className={s.searchInput}
                                placeholder="Search for a movie"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {searchInput && (
                                <button className={s.clearButton} onClick={handleClear}>
                                    ✕
                                </button>
                            )}
                        </div>
                        <button
                            className={s.searchButton}
                            onClick={handleSearch}
                            disabled={!searchInput.trim()}
                        >
                            Search
                        </button>
                    </div>
                    <MoviesGridSkeleton count={20}/>
                </div>
            </div>
        );
    }

    // Состояние 3: Ошибка
    if (error) {
        return (
            <div className={s.container}>
                <h1 className={s.pageTitle}>Search Results</h1>

                <div className={s.searchSection}>
                    <div className={s.searchBox}>
                        <div className={s.inputWrapper}>
                            <input
                                type="text"
                                className={s.searchInput}
                                placeholder="Search for a movie"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {searchInput && (
                                <button className={s.clearButton} onClick={handleClear}>
                                    ✕
                                </button>
                            )}
                        </div>
                        <button
                            className={s.searchButton}
                            onClick={handleSearch}
                            disabled={!searchInput.trim()}
                        >
                            Search
                        </button>
                    </div>
                    <div className={s.error}>
                        <p>Error loading movies. Please try again.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Состояние 4: Нет результатов
    if (data?.results.length === 0) {
        return (
            <div className={s.container}>
                <h1 className={s.pageTitle}>Search Results</h1>

                <div className={s.searchSection}>
                    <div className={s.searchBox}>
                        <div className={s.inputWrapper}>
                            <input
                                type="text"
                                className={s.searchInput}
                                placeholder="Search for a movie"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {searchInput && (
                                <button className={s.clearButton} onClick={handleClear}>
                                    ✕
                                </button>
                            )}
                        </div>
                        <button
                            className={s.searchButton}
                            onClick={handleSearch}
                            disabled={!searchInput.trim()}
                        >
                            Search
                        </button>
                    </div>
                    <div className={s.emptyState}>
                        <p>No matches found for "{currentQuery}"</p>
                    </div>
                </div>
            </div>
        );
    }

    // Состояние 5: Есть результаты
    return (
        <div className={s.container}>
            <h1 className={s.pageTitle}>Search Results</h1>

            <div className={s.searchSection}>
                <div className={s.searchBox}>
                    <div className={s.inputWrapper}>
                        <input
                            type="text"
                            className={s.searchInput}
                            placeholder="Search for a movie"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        {searchInput && (
                            <button className={s.clearButton} onClick={handleClear}>
                                ✕
                            </button>
                        )}
                    </div>
                    <button
                        className={s.searchButton}
                        onClick={handleSearch}
                        disabled={!searchInput.trim()}
                    >
                        Search
                    </button>
                </div>
            </div>

            <h2 className={s.resultsTitle}>
                Results for "{currentQuery}"
            </h2>

            <div className={s.moviesGrid}>
                {data?.results.map((movie) => (
                    <div
                        key={movie.id}
                        className={s.movieCard}
                        onClick={() => handleMovieClick(movie.id)}
                    >
                        <div className={s.posterWrapper}>
                            {movie.poster_path ? (
                                <>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className={s.poster}
                                    />
                                    <div className={`${s.ratingBadge} ${getRatingColor(movie.vote_average)}`}>
                                        <span className={s.ratingValue}>{movie.vote_average.toFixed(1)}</span>
                                    </div>
                                </>
                            ) : (
                                <div className={s.posterPlaceholder}>
                                    <span>No poster</span>
                                </div>
                            )}
                        </div>
                        <h3 className={s.movieTitle}>{movie.title}</h3>
                    </div>
                ))}
            </div>

            {/* Пагинация */}
            {data && data.total_pages > 1 && (
                <div className={s.pagination}>
                    <button
                        className={s.pageButton}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Previous
                    </button>

                    <div className={s.pageNumbers}>
                        {(() => {
                            const totalPages = Math.min(data.total_pages, 500);
                            const pages: (number | string)[] = [];

                            pages.push(1);

                            let startPage = Math.max(2, currentPage - 1);
                            let endPage = Math.min(totalPages - 1, currentPage + 1);

                            if (currentPage <= 3) {
                                startPage = 2;
                                endPage = Math.min(totalPages - 1, 4);
                            }

                            if (currentPage >= totalPages - 2) {
                                startPage = Math.max(2, totalPages - 3);
                                endPage = totalPages - 1;
                            }

                            if (startPage > 2) {
                                pages.push('...');
                            }

                            for (let i = startPage; i <= endPage; i++) {
                                pages.push(i);
                            }

                            if (endPage < totalPages - 1) {
                                pages.push('...');
                            }

                            if (totalPages > 1) {
                                pages.push(totalPages);
                            }

                            return pages.map((page, index) => {
                                if (page === '...') {
                                    return <span key={`dots-${index}`} className={s.dots}>...</span>;
                                }
                                const pageNum = page as number;
                                return (
                                    <button
                                        key={pageNum}
                                        className={`${s.pageNumber} ${currentPage === pageNum ? s.activePage : ''}`}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            });
                        })()}
                    </div>

                    <button
                        className={s.pageButton}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === (data.total_pages || 1) || currentPage >= 500}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};