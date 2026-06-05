import {baseQueryWithErrorHandling} from "@/app/api/baseQueryWithErrorHandling";
import type {
    ApiResponse,
    CreditsResponse,
    DiscoverParams,
    Genre,
    MovieDetails,
    SearchParams,
    SimilarResponse
} from "@/app/api/tmdbAPI.types";
import type {CategoryType} from "@/features/categoryMovies/ui/CategoryMoviesPage";
import {createApi} from '@reduxjs/toolkit/query/react';

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        getPopularMovies: builder.query<ApiResponse, number | void>({
            query: (page = 1) => `/movie/popular?language=en-US&page=${page}`,
        }),
        getTopRatedMovies: builder.query<ApiResponse, number | void>({
            query: (page = 1) => `/movie/top_rated?language=en-US&page=${page}`
        }),
        getUpcomingMovies: builder.query<ApiResponse, number | void>({
            query: (page = 1) => `/movie/upcoming?language=en-US&page=${page}`,
        }),
        getNowPlayingMovies: builder.query<ApiResponse, number | void>({
            query: (page = 1) => `/movie/now_playing?language=en-US&page=${page}`,
        }),
        searchMovies: builder.query<ApiResponse, SearchParams>({
            query: ({ query, page = 1 }) =>
                `/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
        }),
        getMoviesByCategory: builder.query<ApiResponse, { category: CategoryType; page?: number }>({
            query: ({ category, page = 1 }) => `/movie/${category}?language=en-US&page=${page}`,
        }),
        getGenres: builder.query<{ genres: Genre[] }, void>({
            query: () => '/genre/movie/list?language=en-US',
        }),
        discoverMovies: builder.query<ApiResponse, DiscoverParams>({  // DISCOVER-фильтрация
            query: (params) => {
                // Базовый URL с обязательными параметрами
                let url = `/discover/movie?page=${params.page}&sort_by=${params.sort_by}`;

                // Добавляем опциональные параметры
                if (params.with_genres) url += `&with_genres=${params.with_genres}`;
                if (params['vote_average.gte'] !== undefined) url += `&vote_average.gte=${params['vote_average.gte']}`;
                if (params['vote_average.lte'] !== undefined) url += `&vote_average.lte=${params['vote_average.lte']}`;

                return url;
            },
        }),
        // Детали фильма
        getMovieDetails: builder.query<MovieDetails, number>({
            query: (movieId) => `/movie/${movieId}?language=en-US`,
        }),

        // Актеры фильма (credits)
        getMovieCredits: builder.query<CreditsResponse, number>({
            query: (movieId) => `/movie/${movieId}/credits?language=en-US`,
        }),

        // Похожие фильмы
        getSimilarMovies: builder.query<SimilarResponse, { movieId: number; page?: number }>({
            query: ({ movieId, page = 1 }) => `/movie/${movieId}/similar?language=en-US&page=${page}`,
        }),
    }),
});

export const {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetNowPlayingMoviesQuery,
    useSearchMoviesQuery,
    useGetMoviesByCategoryQuery,
    useDiscoverMoviesQuery,
    useGetGenresQuery,
    useGetMovieDetailsQuery,
    useGetMovieCreditsQuery,
    useGetSimilarMoviesQuery
} = tmdbApi;