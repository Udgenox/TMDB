import {z} from "zod";

// Схема для жанра
const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
});

// Схема для деталей фильма
export const MovieDetailsSchema = z.object({
    id: z.number(),
    title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    vote_average: z.number(),
    vote_count: z.number(),
    release_date: z.string(),
    runtime: z.number(),
    genres: z.array(GenreSchema),
    tagline: z.string(),
    status: z.string(),
});

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;