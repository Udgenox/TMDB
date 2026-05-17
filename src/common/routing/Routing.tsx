import {MainPage} from "@/app/ui/MainPage/MainPage";
import {PageNotFound} from "@/common/components";
import {CategoryMoviesPage, FavoritesPage, FilteredMoviesPage, SearchPage} from "@/features";
import {Route, Routes} from "react-router";

export const Path = {
    Main: '/',
    CategoryMovies: '/playlists',
    FilteredMovies: '/tracks',
    Search: '/search',
    Favorites: '/favorites',
    NotFound: '*',
} as const

export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<MainPage />} />
        <Route path={Path.CategoryMovies} element={<CategoryMoviesPage />} />
        <Route path={Path.FilteredMovies} element={<FilteredMoviesPage />} />
        <Route path={Path.Search} element={<SearchPage />} />
        <Route path={Path.Favorites} element={<FavoritesPage />} />
        <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
)