import { server } from "./server/app";
Bun.serve<typeof server>(server);