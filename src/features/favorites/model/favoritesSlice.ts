import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type FavoritesState = {
    ids: number[]
}

const loadFavorites = (): number[] => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
};

const initialState: FavoritesState = {
    ids: loadFavorites(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const index = state.ids.indexOf(action.payload);
            if (index === -1) {
                state.ids.push(action.payload);
            } else {
                state.ids.splice(index, 1);
            }
            localStorage.setItem('favorites', JSON.stringify(state.ids));
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;