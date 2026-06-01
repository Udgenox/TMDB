import {useGetMoviesByCategoryQuery} from "@/app/api/tmdbApi";
import {MovieCard} from "@/common/components/MovieCard/MovieCard";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";
import s from './CategoryMoviesPage.module.css'

export type CategoryType = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

const categories: { id: CategoryType; label: string }[] = [
    { id: 'popular', label: 'Popular' },
    { id: 'top_rated', label: 'Top Rated' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'now_playing', label: 'Now Playing' },
];

const getCategoryTitle = (category: CategoryType): string => {
    switch (category) {
        case 'popular': return 'Popular Movies';
        case 'top_rated': return 'Top Rated Movies';
        case 'upcoming': return 'Upcoming Movies';
        case 'now_playing': return 'Now Playing Movies';
        default: return 'Movies';
    }
};

export const CategoryMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Читаем категорию из URL, по умолчанию 'popular'
    const categoryFromUrl = (searchParams.get('category') as CategoryType) || 'popular';
    const pageFromUrl = parseInt(searchParams.get('page') || '1');

    const [currentCategory, setCurrentCategory] = useState<CategoryType>(categoryFromUrl);
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    const { data, isLoading, isFetching } = useGetMoviesByCategoryQuery({
        category: currentCategory,
        page: currentPage,
    });

    // Обновляем состояние при изменении URL
    useEffect(() => {
        setCurrentCategory(categoryFromUrl);
        setCurrentPage(pageFromUrl);
    }, [categoryFromUrl, pageFromUrl]);

    const handleCategoryChange = (category: CategoryType) => {
        setCurrentCategory(category);
        setCurrentPage(1);
        setSearchParams({ category, page: '1' });
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= (data?.total_pages || 1)) {
            setCurrentPage(page);
            setSearchParams({ category: currentCategory, page: page.toString() });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Заголовок страницы
    const pageTitle = getCategoryTitle(currentCategory);
    const totalPages = Math.min(data?.total_pages || 1, 500);

    return (
        <div className={s.container}>
            {/* Кнопки категорий */}
            <div className={s.tabs}>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`${s.tabButton} ${currentCategory === cat.id ? s.activeTab : ''}`}
                        onClick={() => handleCategoryChange(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Заголовок выбранной категории */}
            <h1 className={s.pageTitle}>{pageTitle}</h1>

            {/* Загрузка */}
            {isLoading && (
                <div className={s.loading}>Loading...</div>
            )}

            {/* Ошибка */}
            {!isLoading && !data?.results && (
                <div className={s.error}>Failed to load movies</div>
            )}

            {/* Сетка фильмов */}
            {data?.results && data.results.length > 0 && (
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

                    {/* Пагинация в формате "1 2 3 ... последняя" */}
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
                                {(() => {
                                    const pages: (number | string)[] = [];

                                    // Всегда показываем первую страницу
                                    pages.push(1);

                                    // Определяем диапазон страниц вокруг текущей
                                    let startPage = Math.max(2, currentPage - 1);
                                    let endPage = Math.min(totalPages - 1, currentPage + 1);

                                    // Корректируем для начала (страница 2 или 3)
                                    if (currentPage <= 3) {
                                        startPage = 2;
                                        endPage = Math.min(totalPages - 1, 4);
                                    }

                                    // Корректируем для конца
                                    if (currentPage >= totalPages - 2) {
                                        startPage = Math.max(2, totalPages - 3);
                                        endPage = totalPages - 1;
                                    }

                                    // Добавляем троеточие перед диапазоном
                                    if (startPage > 2) {
                                        pages.push('...');
                                    }

                                    // Добавляем страницы из диапазона
                                    for (let i = startPage; i <= endPage; i++) {
                                        pages.push(i);
                                    }

                                    // Добавляем троеточие после диапазона
                                    if (endPage < totalPages - 1) {
                                        pages.push('...');
                                    }

                                    // Всегда показываем последнюю страницу (если больше 1)
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
                                disabled={currentPage === totalPages || currentPage >= 500}
                            >
                                Next →
                            </button>
                        </div>
                    )}

                    {/* Индикатор загрузки при смене страницы */}
                    {isFetching && !isLoading && (
                        <div className={s.fetchingIndicator}>Loading more...</div>
                    )}
                </>
            )}

            {/* Нет результатов */}
            {data?.results && data.results.length === 0 && !isLoading && (
                <div className={s.emptyState}>
                    <h2>No movies found in this category</h2>
                </div>
            )}
        </div>
    );
};