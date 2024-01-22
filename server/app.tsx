import { Hono } from "hono";
import musicRouter from "./routes/music";
import adminRouter from "./routes/admin";
import api from "./routes/api/api";
import { basicAuth } from "hono/basic-auth";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { csrf } from 'hono/csrf'
import { serveStatic } from "hono/bun";
import mp3StreamMiddleware from "./middleware/fileStreamMiddleware";
import { jsxRenderer } from "hono/jsx-renderer";
import { Index } from "../pages/Index";
import { Layout } from "../pages/Layout/Layout";
import { Suspense } from "hono/jsx/streaming";
import { ErrorBoundary } from "hono/jsx";
import libraryRouter from "./routes/library";
import { compressMiddleware } from "./middleware/gzipMiddleware";
import { cacheControl } from "./middleware/cacheHandlerMiddleware";

const app = new Hono();

app.use("*", basicAuth({
    username: "admin",
    password: Bun.env.ADMIN_PW!,

}))
const globalHandlers = [compressMiddleware, logger(), csrf()]
app.use('*', ...globalHandlers)

app.use("/content/*", mp3StreamMiddleware, cacheControl({ cache: false }), etag({ weak: true }), serveStatic({ root: "./" }))
app.use("/static/*", cacheControl({ cache: true, maxAge: 60000 }), etag(), serveStatic({ root: "./" }))

app.get("/*", jsxRenderer(({ children }) => {
    return <Layout>
        <ErrorBoundary fallback={<div>Out of Service</div>}>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </ErrorBoundary>
    </Layout>
}, { stream: true, docType: true }))

app.get("/", (c) => c.render(<Index />))

app.route("/api", api);
app.route("/music", musicRouter)
app.route("/admin", adminRouter)
app.route("/library", libraryRouter)

export default {
    port: Bun.env.PORT || 8080,
    fetch: app.fetch
};