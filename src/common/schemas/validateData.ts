import {errorToast} from "@/common/utils/errorToast";
import { z } from 'zod';


export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T | null {
    const result = schema.safeParse(data);

    if (!result.success) {
        console.error('❌ Zod validation failed:', result.error);
        errorToast('Data validation error. Please try again later.');
        return null;
    }

    return result.data;
}