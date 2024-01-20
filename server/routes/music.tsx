import { Hono } from "hono";
import { Music } from "../../pages/Music";
import { Song } from "../../pages/Song";
import { getAllSongsQuery } from "../../db/migration/migration";

const musicRouter = new Hono();

musicRouter.get("/",(c) => {

    const inDb = getAllSongsQuery();
    console.log(inDb);
    return c.render(<Music/>);
})

musicRouter.get("/:name", (c) => {
    const name = c.req.param("name");
    return c.render(<Song link={name}/>);
})
export default musicRouter;