import { AdminAlbums } from "@p/Admin/AdminAlbums";
import { AdminLayout } from "@p/Layout/AdminLayout";
import { Hono } from "hono";

export const albumsRouter = new Hono();

albumsRouter.get("/", (c) => {
    return c.render(<AdminLayout><AdminAlbums /></AdminLayout>)
})