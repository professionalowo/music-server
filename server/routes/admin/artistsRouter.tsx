import { AdminArtists } from "@p/Admin/AdminArtists";
import { AdminLayout } from "@p/Layout/AdminLayout";
import { Hono } from "hono";

export const artistsRouter = new Hono();

artistsRouter.get("/", (c) => {
    return c.render(<AdminLayout><AdminArtists /></AdminLayout>)
})