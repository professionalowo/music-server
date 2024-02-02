import { AdminSongs } from "@p/Admin/AdminSongs";
import { AdminLayout } from "@p/Layout/AdminLayout";
import { Hono } from "hono";

export const songsRouter = new Hono();

songsRouter.get("/", (c) => {
    return c.render(<AdminLayout><AdminSongs /></AdminLayout>)
})