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
        getPopularMovies: builder.query({
            query: (page = 1) => `/movie/popular?language=en-US&page=${page}`,
        }),
    }),
});

export const { useGetPopularMoviesQuery } = tmdbApi;