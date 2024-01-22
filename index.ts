import type { ServeOptions } from "bun";
import app from "./server/app";

Bun.serve<ServeOptions>(app);