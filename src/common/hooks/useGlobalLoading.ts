import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store/store';
// import { tmdbApi } from '@/app/api/tmdbApi';

// Список эндпоинтов для исключения из глобального индикатора
const excludedEndpoints = [
    // Можно добавить эндпоинты, которые не должны показывать загрузку
    // tmdbApi.endpoints.getGenres.name,        // пример: жанры не показывают загрузку
    // tmdbApi.endpoints.getMovieDetails.name,  // пример: детали фильма
];

export const useGlobalLoading = () => {
    return useSelector((state: RootState) => {
        // Получаем все активные запросы из RTK Query API
        const queries = Object.values(state.tmdbApi.queries || {});
        const mutations = Object.values(state.tmdbApi.mutations || {});

        // Проверяем, есть ли активные запросы (статус 'pending')
        const hasActiveQueries = queries.some(query => {
            if (query?.status !== 'pending') return false;
            if (excludedEndpoints.includes(query.endpointName)) {
                // Если эндпоинт в исключениях — не показываем загрузку
                return false;
            }
            return true;
        });

        const hasActiveMutations = mutations.some(mutation => mutation?.status === 'pending');

        return hasActiveQueries || hasActiveMutations;
    });
};