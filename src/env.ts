import z from "zod";

const envSchema = z.object({
    DATABASE_URL: z.url(),
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string(),
    ADMIN_USERNAME: z.string().min(3).default("admin@gmail.com"),
    ADMIN_PASSWORD: z.string().min(6).default("123456")
})

export const env = envSchema.parse(process.env)
