import type {ApiResponse, SearchParams} from "@/app/api/tmdbAPI.types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
    }),
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

    }),
});

export const { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery, useGetNowPlayingMoviesQuery, useSearchMoviesQuery } = tmdbApi;