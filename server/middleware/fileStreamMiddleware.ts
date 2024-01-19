import type { Context, Next } from "hono";
import { stream } from "hono/streaming";


export default async function mp3StreamMiddleware(c: Context, next: Next) {
    const { path } = c.req;
    if (path.endsWith(".mp3")) {
        console.log("Streaming mp3 file");

        const file = Bun.file(path.substring(1).replaceAll("%20", " "));
        if (!await file.exists()) return c.status(404);

        return stream(c, async (stream) => {
            await stream.pipe(file.stream())
        });
    }

    
    await next();
}