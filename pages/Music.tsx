import client from "@db/db";
import { readMp3Content } from "@s/functions/fileReader";

export const Music = async () => {
    const availableSongs = await client.songs.getAll();
    return <div>
        <p>Available Songs: {availableSongs.length}</p>
        <ul class="flex flex-col gap-4">
            {availableSongs.map(song => <li><a href={`music/${song.name}`}>{song.artist} - {song.name}</a></li>)}
        </ul>
    </div>
}
