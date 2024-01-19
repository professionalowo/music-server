import { Hono } from "hono";
import { Music } from "../../pages/Music";
import { Song } from "../../pages/Song";

const musicRouter = new Hono();

musicRouter.get("/",(c) => {
    return c.render(<Music/>);
})

musicRouter.get("/:name", (c) => {
    const name = c.req.param("name");
    return c.render(<Song link={name}/>);
})
export default musicRouter;