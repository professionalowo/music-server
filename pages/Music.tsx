import client from "@db/db";

export const Music = async () => {
    const availableSongs = client.songs.getAll();
    return <div>
        <p class="pb-5">Available Songs: {availableSongs.length}</p>
        <ul class="flex flex-col gap-4">
            {availableSongs.map(song => <li class="flex gap-3">
                <a href={`music/${song.name}`}>{song.artist} - {song.name}</a>
                <a href={`music/edit/${song.name}`}>Edit</a>
            </li>)}
        </ul>
    </div>
}
