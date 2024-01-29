import type { ZlibCompressionOptions } from "bun";
import type { Context, MiddlewareHandler, Next } from "hono";
/**
 * 
 * @param {Response} res the response to gzip
 * @returns {Promise<Response>} the gziped response
 */
async function gzipResponse(res: Response, options?: ZlibCompressionOptions): Promise<Response> {
    const buff = await res.arrayBuffer();
    const arr = new Uint8Array(buff);
    const compressed = Bun.gzipSync(arr, options);
    return new Response(compressed);
}

export function gzip(options?: ZlibCompressionOptions): MiddlewareHandler {

    return async function (c: Context, next: Next) {
        await next();
        const { req, res } = c;
        const header = req.header("Accept-Encoding")?.split(", ");
        const shouldGzip = header?.find(h => h.includes("gzip"));
        const contentType = res.headers.get("Content-Type");
        if (!shouldGzip || !res.body || !contentType) return res;
        c.res = await gzipResponse(res, options);
        c.header("Content-Encoding", "gzip")
        c.header("Content-Type", contentType)
    }
}