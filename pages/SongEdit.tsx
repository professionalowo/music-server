import type { SongSchema } from "@db/db";

export function SongEdit({ name, artist }: SongSchema) {
    return <form class="flex flex-col gap-3" method="POST">
        <div class="flex gap-3">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value={name} class="bg-slate-500 rounded"></input>
        </div>
        <div class="flex gap-3">
            <label for="artist">Artist:</label>
            <input type="text" id="artist" name="artist" value={artist} class="bg-slate-500 rounded"></input>
        </div>
        <button type="submit">Commit</button>
    </form>
}