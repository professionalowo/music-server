import client, { type SongSchema } from "@db/db";

export const Artist = ({ name }: { name: string }) => {
    const songs = client.songs.getByArtist({ $artist: name });
    return <div>
        <h1 class="py-5">Songs by {name}</h1>
        <ul class="flex flex-col gap-3">{songs.map((s,) => <SongCard {...s} />)}</ul>
        <script src="/static/js/player.js" defer></script>
    </div>
}


const SongCard = ({ name, uri }: SongSchema) => {
    return <li class="flex w-full items-center gap-3">
        <a href={`/music/${name}`}>{name}</a>
        <audio controlslist="nodownload" controls src={`/${uri}`}></audio>
        <button id="loop"
            class="bg-slate-950 p-2 rounded-md hover:bg-slate-700 shadow shadow-md">
            <img alt="loop" src="/static/img/repeat.svg" width={32} height={32}></img>
        </button>
    </li>
}