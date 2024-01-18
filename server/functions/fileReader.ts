import { readdir } from "node:fs/promises"

export async function readMp3Content() {
    const files = await readdir("content");
    return files.filter(f => f.endsWith(".mp3"));
} 