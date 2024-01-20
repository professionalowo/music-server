import { Hono } from "hono";
import Admin from "../../pages/Admin";
import mp3UploadValidationMiddleware, { type FormSchema } from "../middleware/mp3ValidationMiddleware";
import { insertIntoSongQuery } from "../../db/migration/migration";
const adminRouter = new Hono()


adminRouter.get("/", (c) => {
    return c.render(<Admin />);
})


adminRouter.post("/", mp3UploadValidationMiddleware, async (c) => {
    const { name, file, artist } = await c.req.parseBody<FormSchema>();
    await Bun.write(`content/${name}`, file)

    insertIntoSongQuery({ $name: name, $artist: artist, $uri: `content/${name}` });
    
    return c.redirect("/music");
})

export default adminRouter;