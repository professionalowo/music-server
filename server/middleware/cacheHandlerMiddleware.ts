import type { Context, Next } from "hono";

type CacheControlOptions = {
    cache: true,
    maxAge: number,
} | { cache: false }

export function cacheControl(opts: CacheControlOptions) {

    return async (c: Context, next: Next) => {
        await next();
        let header: string;
        if (opts.cache)
            header = `max-age=${opts.maxAge}`;
        else
            header = "no-cache"
        c.header("Cache-Control", header);
    }
}