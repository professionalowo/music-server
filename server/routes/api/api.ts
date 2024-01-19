import { Hono } from "hono";
import musicApi from "./music";

const api = new Hono();

api.route("/music",musicApi);

export default api;