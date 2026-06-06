import {useGetPopularMoviesQuery} from "@/app/api";
import {useGetNowPlayingMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery} from "@/app/api/tmdbApi";
import {MovieSection} from "@/common/components/MovieSection/MovieSection";
import {MoviesGridSkeleton} from "@/common/components/Skeletons";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import s from './MainPage.module.css';

export const MainPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');

    const { data: popularMovies, isLoading: isLoadingPopular } = useGetPopularMoviesQuery(1);
    const { data: topRatedMovies, isLoading: isLoadingTopRated } = useGetTopRatedMoviesQuery(1);
    const { data: upcomingMovies, isLoading: isLoadingUpcoming } = useGetUpcomingMoviesQuery(1);
    const { data: nowPlayingMovies, isLoading: isLoadingNowPlaying } = useGetNowPlayingMoviesQuery(1);

    useEffect(() => {
        if (popularMovies?.results && popularMovies.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * popularMovies.results.length);
            const randomMovie = popularMovies.results[randomIndex];

            if (randomMovie.backdrop_path) {
                const imageUrl = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
                setBackgroundImage(imageUrl);
            }
        }
    }, [popularMovies]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            handleSearch();
        }
    };

    const handleViewMore = (category: string) => {
        navigate(`/category?type=${category}`);
    };

    return (
        <>
            <section
                className={s.welcomeSection}
                style={{
                    backgroundImage: backgroundImage
                        ? `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`
                        : undefined
                }}
            >
                <div className={s.container}>
                    <div className={s.content}>
                        <h1 className={s.title}>WELCOME</h1>
                        <p className={s.subtitle}>Browse highlighted titles from TMDB</p>

                        <div className={s.searchContainer}>
                            <input
                                type="text"
                                className={s.searchInput}
                                placeholder="Search for a movie"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                className={s.searchButton}
                                onClick={handleSearch}
                                disabled={!searchQuery.trim()}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className={s.container}>
                {/* Popular Movies */}
                {isLoadingPopular ? (
                    <div className={s.skeletonSection}>
                        <div className={s.sectionHeader}>
                            <h2 className={s.sectionTitle}>Popular Movies</h2>
                        </div>
                        <MoviesGridSkeleton count={6} />
                    </div>
                ) : (
                    <MovieSection
                        title="Popular Movies"
                        movies={popularMovies?.results || []}
                        onViewMore={() => handleViewMore('popular')}
                    />
                )}

                {/* Top Rated Movies */}
                {isLoadingTopRated ? (
                    <div className={s.skeletonSection}>
                        <div className={s.sectionHeader}>
                            <h2 className={s.sectionTitle}>Top Rated</h2>
                        </div>
                        <MoviesGridSkeleton count={6} />
                    </div>
                ) : (
                    <MovieSection
                        title="Top Rated"
                        movies={topRatedMovies?.results || []}
                        onViewMore={() => handleViewMore('top_rated')}
                    />
                )}

                {/* Upcoming Movies */}
                {isLoadingUpcoming ? (
                    <div className={s.skeletonSection}>
                        <div className={s.sectionHeader}>
                            <h2 className={s.sectionTitle}>Upcoming</h2>
                        </div>
                        <MoviesGridSkeleton count={6} />
                    </div>
                ) : (
                    <MovieSection
                        title="Upcoming"
                        movies={upcomingMovies?.results || []}
                        onViewMore={() => handleViewMore('upcoming')}
                    />
                )}

                {/* Now Playing Movies */}
                {isLoadingNowPlaying ? (
                    <div className={s.skeletonSection}>
                        <div className={s.sectionHeader}>
                            <h2 className={s.sectionTitle}>Now Playing</h2>
                        </div>
                        <MoviesGridSkeleton count={6} />
                    </div>
                ) : (
                    <MovieSection
                        title="Now Playing"
                        movies={nowPlayingMovies?.results || []}
                        onViewMore={() => handleViewMore('now_playing')}
                    />
                )}
            </div>
        </>
    );
};