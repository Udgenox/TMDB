import {validateData} from "@/common/schemas/validateData";
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { handleErrors } from '@/common/utils/handleErrors';

import {
    ApiResponseSchema,
    MovieDetailsSchema,
    CreditsResponseSchema
} from '@/common/schemas';
import { z } from 'zod';

// Определяем, какой endpoint какую схему использует
const getSchemaForEndpoint = (url: string): z.ZodSchema<any> | null => {
    // API Response схема (для списков фильмов)
    if (url.includes('/movie/popular') ||
        url.includes('/movie/top_rated') ||
        url.includes('/movie/upcoming') ||
        url.includes('/movie/now_playing') ||
        url.includes('/search/movie') ||
        url.includes('/discover/movie') ||
        url.includes('/similar')) {
        return ApiResponseSchema;
    }

    // Credits схема (для актёров)
    if (url.includes('/credits')) {
        return CreditsResponseSchema;
    }

    // Movie Details схема (для деталей фильма)
    if (url.match(/\/movie\/\d+$/) && !url.includes('/credits') && !url.includes('/similar')) {
        return MovieDetailsSchema;
    }

    // Для жанров и других endpoint'ов — не валидируем
    return null;
};

export const baseQueryWithErrorHandling: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // await new Promise(resolve => setTimeout(resolve, 3000));

    const rawBaseQuery = fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_API_KEY}`);
            return headers;
        },
    });

    const result = await rawBaseQuery(args, api, extraOptions);

    // 1. Обработка HTTP ошибок
    if (result.error) {
        handleErrors(result.error);
        return result;
    }

    // 2. Валидация данных (Zod)
    const url = typeof args === 'string' ? args : args.url;
    const schema = getSchemaForEndpoint(url);

    if (schema && result.data) {
        const validatedData = validateData(schema, result.data);
        if (validatedData === null) {
            // Валидация не прошла — возвращаем ошибку
            return {
                error: {
                    status: 'CUSTOM_ERROR',
                    error: 'Data validation failed',
                    data: result.data,
                } as FetchBaseQueryError,
            };
        }
        return { data: validatedData };
    }

    return result;
};