import { Database } from "bun:sqlite"
const db = new Database("./data.db");

export default db;