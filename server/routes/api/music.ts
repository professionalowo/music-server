import { Hono } from "hono";
import { readMp3Content } from "../../functions/fileReader";

const musicApi = new Hono()

musicApi.get("/",async (c) =>{
    const files = await readMp3Content();
    return c.json(files);
})


export default musicApi;