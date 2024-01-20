import { Hono } from "hono";
import app from "../app";
import { Library } from "../../pages/Library";
import { Artist } from "../../pages/Artist";

const libraryRouter = new Hono();


libraryRouter.get("/", c => c.render(<Library />));

libraryRouter.get("/:name", c => c.render(<Artist name={c.req.param("name")}/>))

export default libraryRouter;