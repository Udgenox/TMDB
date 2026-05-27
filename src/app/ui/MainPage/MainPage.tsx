import { useState } from 'react';
import { useNavigate } from 'react-router';
import s from './MainPage.module.css';

export const MainPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

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

    return (
        <section className={s.welcomeSection}>
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
    );
};