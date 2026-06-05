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

export type SortOption =
    | 'popularity.desc'      // по популярности (убывание)
    | 'popularity.asc'       // по популярности (возрастание)
    | 'vote_average.desc'    // по рейтингу (убывание)
    | 'vote_average.asc'     // по рейтингу (возрастание)
    | 'primary_release_date.desc'  // по дате (новые сначала)
    | 'primary_release_date.asc'   // по дате (старые сначала)
    | 'original_title.asc'   // по названию (А-Я)
    | 'original_title.desc';  // по названию (Я-А)

export type DiscoverParams = {
    page: number;
    sort_by: SortOption;
    with_genres?: string;      // жанры через запятую, например "28,35"
    'vote_average.gte'?: number;  // рейтинг от
    'vote_average.lte'?: number;  // рейтинг до
};

export type Genre = {
    id: number;
    name: string;
};

export type MovieDetails = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    release_date: string;
    runtime: number;
    genres: { id: number; name: string }[];
    tagline: string;
    status: string;
};

export type CastMember = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
};

export type CreditsResponse = {
    id: number;
    cast: CastMember[];
    crew: { id: number; name: string; job: string }[];
};

export type SimilarResponse = ApiResponse;