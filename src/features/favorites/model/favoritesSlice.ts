import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type FavoriteMovie = {
    id: number;
    title: string;
    posterPath: string | null;
    voteAverage: number;
};

export type FavoritesState = {
    items: FavoriteMovie[];
};

// Загружаем избранное из localStorage
const loadFavorites = (): FavoriteMovie[] => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
};

const initialState: FavoritesState = {
    items: loadFavorites(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
            const movie = action.payload;
            const index = state.items.findIndex(item => item.id === movie.id);

            if (index === -1) {
                // Добавляем в избранное
                state.items.push(movie);
            } else {
                // Удаляем из избранного
                state.items.splice(index, 1);
            }

            // Сохраняем в localStorage
            localStorage.setItem('favorites', JSON.stringify(state.items));
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.items));
        },
    },
});

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;