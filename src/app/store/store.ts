import {tmdbApi} from "@/app/api";
import {favoritesReducer} from "@/features/favorites/model/favoritesSlice";
import {themeReducer} from "@/features/theme/model/themeSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        favorites: favoritesReducer,
        theme: themeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;