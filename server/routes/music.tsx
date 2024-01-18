import { Hono } from "hono";
import { Music } from "../../pages/Music";
import { readMp3Content } from "../functions/fileReader";
import { Song } from "../../pages/Song";

const musicRouter = new Hono();

musicRouter.get("/",async (c) => {
    //exclude source
    const files = await readMp3Content();
    return c.render(<Music availableSongs={files}/>);
})

musicRouter.get("/:name", (c) => {
    const name = c.req.param("name");
    return c.render(<Song link={name}/>);
})
export default musicRouter;