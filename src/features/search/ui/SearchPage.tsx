
import {useSearchMoviesQuery} from "@/app/api";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import s from './SearchPage.module.css'

export const SearchPage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const queryFromUrl = searchParams.get('query') || ''
    const [searchInput, setSearchInput] = useState(queryFromUrl)
    const [currentQuery, setCurrentQuery] = useState(queryFromUrl)

    const { data, isLoading, error } = useSearchMoviesQuery(                    // Хук для запроса к API
        { query: currentQuery, page: 1 },                                          // Параметры запроса: текст и страница
        { skip: !currentQuery }                                                    // Пропускаем запрос, если запрос пустой
    )

    useEffect(() => {
        setSearchInput(queryFromUrl)
        setCurrentQuery(queryFromUrl)
    }, [queryFromUrl])

    const handleSearch = () => {
        if (searchInput.trim()) {
            setCurrentQuery(searchInput.trim())
            navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>)=> {
        if (e.key === 'Enter' && searchInput.trim()) {
            handleSearch()
        }
    }

    const handleClear = () => {
        setSearchInput('')
        setCurrentQuery('')
        navigate('/search')
    }

    const handleMovieClick= (movieId: number) => {
        navigate(`/movies/${movieId}`)
    }

    if (!currentQuery) {


    }

    // Состояние 1: Нет запроса
    if (!currentQuery) {
        return (
            <div className={s.container}>
                <div className={s.searchHeader}>
                    <div className={s.searchBox}>
                        <input
                            type="text"
                            className={s.searchInput}
                            placeholder="Search for a movie..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className={s.searchButton}
                            onClick={handleSearch}
                            disabled={!searchInput.trim()}
                        >
                            Search
                        </button>
                        {searchInput && (
                            <button className={s.clearButton} onClick={handleClear}>
                                ✖
                            </button>
                        )}
                    </div>
                </div>
                <div className={s.emptyState}>
                    <h2>Enter a movie title to start searching</h2>
                </div>
            </div>
        );
    }

    // Состояние 2: Загрузка
    if (isLoading) {
        return (
            <div className={s.container}>
                <div className={s.searchHeader}>
                    <div className={s.searchBox}>
                        <input
                            type="text"
                            className={s.searchInput}
                            placeholder="Search for a movie..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className={s.searchButton}
                            onClick={handleSearch}
                            disabled={!searchInput.trim()}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className={s.loading}>Loading...</div>
            </div>
        );
    }

    // Состояние 3: Ошибка
    if (error) {
        return (
            <div className={s.container}>
                <div className={s.searchHeader}>
                    <div className={s.searchBox}>
                        <input
                            type="text"
                            className={s.searchInput}
                            placeholder="Search for a movie..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className={s.searchButton}
                            onClick={handleSearch}
                            disabled={!searchInput.trim()}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className={s.error}>
                    <p>Error loading movies. Please try again.</p>
                </div>
            </div>
        );
    }

    // Состояние 4: Нет результатов
    if (data?.results.length === 0) {
        return (
            <div className={s.container}>
                <div className={s.searchHeader}>
                    <div className={s.searchBox}>
                        <input
                            type="text"
                            className={s.searchInput}
                            placeholder="Search for a movie..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className={s.searchButton}
                            onClick={handleSearch}
                            disabled={!searchInput.trim()}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className={s.emptyState}>
                    <h2>No matches found for "{currentQuery}"</h2>
                </div>
            </div>
        );
    }

    // Состояние 5: Есть результаты
    return (
        <div className={s.container}>
            <div className={s.searchHeader}>
                <div className={s.searchBox}>
                    <input
                        type="text"
                        className={s.searchInput}
                        placeholder="Search for a movie..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className={s.searchButton}
                        onClick={handleSearch}
                        disabled={!searchInput.trim()}
                    >
                        Search
                    </button>
                    {searchInput && (
                        <button className={s.clearButton} onClick={handleClear}>
                            ✖
                        </button>
                    )}
                </div>
            </div>

            <h2 className={s.resultsTitle}>Search results for "{currentQuery}"</h2>

            <div className={s.moviesGrid}>
                {data?.results.map((movie) => (
                    <div
                        key={movie.id}
                        className={s.movieCard}
                        onClick={() => handleMovieClick(movie.id)}
                    >
                        {/* Постер или заглушка "No poster" */}
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
                        <h3 className={s.movieTitle}>{movie.title}</h3>
                        <div className={s.movieRating}>⭐ {movie.vote_average.toFixed(1)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
