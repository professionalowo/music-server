import { Hono } from "hono";
import { Music } from "@p/Music";
import { Song } from "@p/Song";
import client from "@db/db";

const musicRouter = new Hono();

musicRouter.get("/", (c) => {
    return c.render(<Music />);
})

musicRouter.get("/:name", (c) => {
    const name = c.req.param("name");
    const [song] = client.songs.getByName({ $name: name })
    return c.render(<Song {...song} />);
})
export default musicRouter;