import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { errorToast } from './errorToast';
import { isErrorWithMessage } from './isErrorWithMessage';

export const handleErrors = (error: FetchBaseQueryError) => {
    console.log('🔴 Ошибка перехвачена:', error);
    console.log('Статус ошибки:', error.status);

    if (!error) return;

    // ✅ ДОБАВЛЕН ЭТОТ БЛОК
    // Ошибки сети, парсинга, таймаута (строковые статусы)
    if (typeof error.status === 'string') {
        switch (error.status) {
            case 'FETCH_ERROR':
                errorToast('Network error. Please check your internet connection.');
                break;
            case 'PARSING_ERROR':
                errorToast('Data parsing error. Please try again.');
                break;
            case 'TIMEOUT_ERROR':
                errorToast('Request timeout. Please try again.');
                break;
            default:
                errorToast(error.error || 'Network error. Please check your connection.');
        }
        return;
    }

    // HTTP статусы (числовые)
    switch (error.status) {
        case 401:
        case 429:
            // Невалидный ключ или слишком много запросов
            if (isErrorWithMessage(error.data)) {
                errorToast(error.data.message);
            } else {
                errorToast('Authentication error. Please check your API key.');
            }
            break;

        case 404:
            errorToast('Resource not found. Please try again later.');
            break;

        case 500:
        case 502:
        case 503:
        case 504:
            errorToast('Server error. Please try again later.');
            break;

        default:
            // Любая другая ошибка
            if (isErrorWithMessage(error.data)) {
                errorToast(error.data.message);
            } else {
                errorToast('Something went wrong. Please try again.');
            }
    }
};