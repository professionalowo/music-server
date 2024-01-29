import client from "@db/db";

export const Music = async () => {
    const availableSongs = client.songs.getAll();
    return <div>
        <p class="pb-5">Available Songs: {availableSongs.length}</p>
        <ul class="flex flex-col gap-4">
            {availableSongs.map(song => <li><a href={`music/${song.name}`}>{song.artist} - {song.name}</a></li>)}
        </ul>
    </div>
}
