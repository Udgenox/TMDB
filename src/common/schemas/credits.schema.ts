import { z } from 'zod';

// Схема для актёра
const CastMemberSchema = z.object({
    id: z.number(),
    name: z.string(),
    character: z.string(),
    profile_path: z.string().nullable(),
    order: z.number(),
});

// Схема для ответа credits
export const CreditsResponseSchema = z.object({
    id: z.number(),
    cast: z.array(CastMemberSchema),
});

export type CreditsResponse = z.infer<typeof CreditsResponseSchema>;