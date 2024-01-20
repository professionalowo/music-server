import { Hono } from "hono";
import { Library } from "@p/Library";
import { Artist } from "@p/Artist";

const libraryRouter = new Hono();


libraryRouter.get("/", c => c.render(<Library />));

libraryRouter.get("/:name", c => c.render(<Artist name={c.req.param("name")}/>))

export default libraryRouter;