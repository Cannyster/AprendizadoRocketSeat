import {z} from 'zod'

export const envSchema = z.object({
    VITE_API_ULR: z.string().url()
})

export const env = envSchema.parse(import.meta.env)