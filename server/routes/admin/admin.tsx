import Admin from "@p/Admin";
import mp3UploadValidationMiddleware, { type FormSchema } from "../../middleware/mp3ValidationMiddleware";
import client from "@db/db";
import { songsRouter } from "./songsRouter";
import { artistsRouter } from "./artistsRouter";
import { albumsRouter } from "./albumsRouter";
import { Hono } from "hono";

const adminRouter = new Hono();



adminRouter.get("/", (c) => {
    return c.render(<Admin />);
})

adminRouter.post("/", mp3UploadValidationMiddleware, async (c) => {
    const { name, file, artist, file_name } = await c.req.parseBody<FormSchema>();
    await Bun.write(`content/${file_name}`, file)
    client.songs.insert({ $name: name, $artist: artist, $uri: file_name });

    return c.redirect("/music");
})




adminRouter.route("/artists", artistsRouter);
adminRouter.route("/songs", songsRouter);
adminRouter.route("/albums", albumsRouter);
export default adminRouter;