import type { Context, Next } from "hono";
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(1),
    artist: z.string().min(1),
    file: z.instanceof(File)
})

export type FormSchema = z.infer<typeof formSchema>


export default async function mp3UploadValidationMiddleware(c: Context, next: Next) {
    const { req } = c;

    const body = await req.parseBody();
    if (!formSchema.safeParse(body).success) return c.status(400);

    await next();
} 