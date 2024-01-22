import { readMp3Content } from "../server/functions/fileReader";

export const Music = async () => {
    const availableSongs = await readMp3Content();
    return <div>
        <p>Available Songs: {availableSongs.length}</p>
        <ul class="flex flex-col gap-4">
            {availableSongs.map(song => <li><a href={`/music/${song}`}>{song}</a></li>)}
        </ul>
    </div>
}
