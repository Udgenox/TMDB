import {MovieSchema} from "@/common/schemas/movie.schema";
import {z} from "zod";

// Схема для ответа API (пагинация + список фильмов)
export const ApiResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
// SimilarResponse — это тот же ApiResponse (список похожих фильмов)
export type SimilarResponse = ApiResponse;