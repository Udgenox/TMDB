import {createSlice} from "@reduxjs/toolkit";

export type ThemeState = {
    isDark: boolean
}

const loadTheme = (): boolean => {
    return localStorage.getItem('theme') === 'dark';
};

const initialState: ThemeState = {
    isDark: loadTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
            localStorage.setItem('theme', state.isDark ? 'dark' : 'light');

            if (state.isDark) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;