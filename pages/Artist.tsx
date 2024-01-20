import { getSongsByArtistQuery, type SongSchema } from "../db/migration/migration"

export const Artist = ({ name }: { name: string }) => {
    const songs = getSongsByArtistQuery({ $artist: name });
    return <div>
        <h1 class="py-5">Songs by {name}</h1>
        <ul class="flex flex-col gap-3">{songs.map((s, i) => <SongCard index={i} {...s} />)}</ul>
        <script src="/static/js/player.js" defer></script>
    </div>
}


const SongCard = ({ name, uri, index }: SongSchema & { index: number }) => {
    return <li id={`song-${index}`} class="flex w-full items-center gap-3">
        <a href={`/music/${name}`}>{name}</a>
        <audio data-index={index} controlslist="nodownload" controls src={`/${uri}`}></audio>
        <button id="loop"
            class="bg-slate-950 p-2 rounded-md hover:bg-slate-700 shadow shadow-md">
            <img alt="loop" src="/static/img/repeat.svg" width={32} height={32}></img>
        </button>
    </li>
}