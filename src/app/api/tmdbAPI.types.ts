// Тип для фильма
export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    release_date: string;
    genre_ids: number[];
};

// Тип для ответа API
export type ApiResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type SearchParams = {
    query: string;
    page?: number;
}