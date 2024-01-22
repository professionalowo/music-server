import type { Context, Next } from "hono";

export async function compressMiddleware(c: Context, next: Next) {
    await next();

    const { req, res } = c;
    const header = req.header("Accept-Encoding")?.split(", ");
    const shouldGzip = header?.find(h => h.includes("gzip"));
    const contentType = res.headers.get("Content-Type");
    if (!shouldGzip || !res.body || !contentType) return;
    c.res = await gzipResponse(res);
    c.header("Content-Encoding", "gzip")
    c.header("Content-Type", contentType)
}
/**
 * 
 * @param res the response to gzip
 * @returns the gziped response
 */
async function gzipResponse(res: Response): Promise<Response> {
    const buff = await res.arrayBuffer();
    const arr = new Uint8Array(buff);
    const compressed = Bun.gzipSync(arr, {
        level: 9,
        strategy: 0,
        memLevel: 9
    });
    console.log(`Returning gziped data with length ${compressed.byteLength}`)
    return new Response(compressed);
}