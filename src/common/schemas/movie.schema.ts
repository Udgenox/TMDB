import {z} from "zod";

export const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    vote_average: z.number(),
    vote_count: z.number(),
    release_date: z.string(),
    genre_ids: z.array(z.number()),
});

export type Movie = z.infer<typeof MovieSchema>;