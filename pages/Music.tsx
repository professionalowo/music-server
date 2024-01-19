import { readMp3Content } from "../server/functions/fileReader";

export const Music = async () => {
    const availableSongs = await readMp3Content();
    return <ul class="flex flex-col gap-4">
        {availableSongs.map(song => <li><a href={`/music/${song}`}>{song}</a></li>)}
    </ul>
}
