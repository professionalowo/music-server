import { AdminLayout } from "@p/Layout/AdminLayout";
import { Hono } from "hono";

export const artistsRouter = new Hono();

artistsRouter.get("/", (c) => c.render("Artists"))