import { Hono } from "hono";
import Admin from "../../pages/Admin";
const adminRouter = new Hono()


adminRouter.get("/", (c) => {
    return c.render(<Admin />);
})


adminRouter.post("/", async (c) => {
    const body = await c.req.parseBody();

    const blob = body["file"];
    const name = body["name"];
    await Bun.write(`content/${name}`, blob)
    console.log(`Saved file ${name}`)

    return c.redirect("/music")
})

export default adminRouter;