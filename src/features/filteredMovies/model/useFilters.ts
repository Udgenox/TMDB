import type {SortOption} from "@/app/api";
import {useDebounce} from "@/common/hooks/useDebounce";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";

export type FilterState = {
    sortBy: SortOption;
    ratingMin: number;
    ratingMax: number;
    selectedGenres: number[];
    currentPage: number;
};

type UseFiltersReturn = FilterState & {
    setSortBy: (value: SortOption) => void;
    setRatingMin: (value: number) => void;
    setRatingMax: (value: number) => void;
    toggleGenre: (genreId: number) => void;
    setPage: (page: number) => void;
    resetFilters: () => void;
    // Debounced значения для API
    debouncedRatingMin: number;
    debouncedRatingMax: number;
};

export const useFilters = (): UseFiltersReturn => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Состояния
    const [sortBy, setSortBy] = useState<SortOption>(
        (searchParams.get('sort_by') as SortOption) || 'popularity.desc'
    );
    const [localRatingMin, setLocalRatingMin] = useState<number>(
        parseFloat(searchParams.get('vote_average.gte') || '0')
    );
    const [localRatingMax, setLocalRatingMax] = useState<number>(
        parseFloat(searchParams.get('vote_average.lte') || '10')
    );
    const [selectedGenres, setSelectedGenres] = useState<number[]>(() => {
        const genres = searchParams.get('with_genres');
        return genres ? genres.split(',').map(Number) : [];
    });
    const [currentPage, setCurrentPage] = useState<number>(
        parseInt(searchParams.get('page') || '1')
    );

    // Debounce для рейтинга (200 мс)
    const debouncedRatingMin = useDebounce(localRatingMin, 200);
    const debouncedRatingMax = useDebounce(localRatingMax, 200);

    // Синхронизация с URL
    useEffect(() => {
        const params: Record<string, string> = {
            page: currentPage.toString(),
            sort_by: sortBy,
        };

        if (selectedGenres.length > 0) {
            params.with_genres = selectedGenres.join(',');
        }
        if (debouncedRatingMin > 0) {
            params['vote_average.gte'] = debouncedRatingMin.toString();
        }
        if (debouncedRatingMax < 10) {
            params['vote_average.lte'] = debouncedRatingMax.toString();
        }

        setSearchParams(params);
    }, [currentPage, sortBy, selectedGenres, debouncedRatingMin, debouncedRatingMax, setSearchParams]);

    const toggleGenre = (genreId: number) => {
        setSelectedGenres(prev =>
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setSortBy('popularity.desc');
        setLocalRatingMin(0);
        setLocalRatingMax(10);
        setSelectedGenres([]);
        setCurrentPage(1);
    };

    return {
        // Значения
        sortBy,
        ratingMin: localRatingMin,
        ratingMax: localRatingMax,
        selectedGenres,
        currentPage,
        // Debounced значения для API
        debouncedRatingMin,
        debouncedRatingMax,
        // Функции
        setSortBy,
        setRatingMin: setLocalRatingMin,
        setRatingMax: setLocalRatingMax,
        toggleGenre,
        setPage: setCurrentPage,
        resetFilters,
    };
};