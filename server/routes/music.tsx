import { Hono } from "hono";
import { Music } from "@p/Music";
import { Song } from "@p/Song";
import client from "@db/db";
import { SongEdit } from "@p/SongEdit";

const musicRouter = new Hono();

musicRouter.get("/", (c) => {
    return c.render(<Music />);
})

musicRouter.get("/:name", (c) => {
    const name = c.req.param("name");
    const [song] = client.songs.getByName({ $name: name })
    return c.render(<Song {...song} />);
})

const editRouter = new Hono();

editRouter.get("/:name", (c) => {
    const name = c.req.param("name");
    const [song] = client.songs.getByName({ $name: name })
    return c.render(<SongEdit {...song} />)
})

editRouter.post("/:name", async (c) => {
    const search = c.req.param("name");
    const [song] = client.songs.getByName({ $name: search })
    const { req } = c;
    const { name, artist } = await req.parseBody<{ name: string, artist: string }>();

    if (song.name !== name || song.artist !== artist) {
        client.songs.alterSongs({ $filter: song.name }, { $name: name }, { $artist: artist })
    }

    return c.redirect("/music")
})

musicRouter.route("/edit", editRouter);
export default musicRouter;