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

const app = new Hono();


app.use("*", basicAuth({
    username: "admin",
    password: Bun.env.ADMIN_PW!,

}))
const handlers = [etag(), logger(), csrf()]
app.use('*', ...handlers)

app.use("/content/*", mp3StreamMiddleware, serveStatic({ root: "./" }))
app.use("/static/*", serveStatic({ root: "./" }))

app.get("/*", jsxRenderer(({ children }) => {
    return <Layout>{children}</Layout>
}))

app.get("/", (c) => c.render(<Index />))

app.route("/api", api);
app.route("/music", musicRouter)
app.route("/admin", adminRouter)

export default {
    port: Bun.env.PORT || 8080,
    fetch: app.fetch
};