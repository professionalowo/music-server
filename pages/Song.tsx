import type { SongSchema } from "@db/db"
import { Audio } from "./Components/Audio"

export const Song = ({ uri, name }: SongSchema) => {
    return <div class="w-fit h-fit bg-slate-700 px-3 py-6 align-middle rounded-lg shadow-md shadow-slate-200">
        <div class="flex justify-center flex-col gap-3 p-3 items-center wrap max-w-fit">
            <h1>{name}</h1>
            <img class="min-h-64 min-w-64" alt={name} src="/static/img/music-note-beamed.svg"></img>
        </div>
        <div class="flex justify-center gap-3">
            <Audio id="player" controls preload="meta" autoplay={true} controlslist="nodownload" loop={true} src={`/content/${uri}`} type="audio/mpeg">
            </Audio>
            <button id="loop"
                class="bg-slate-950 p-2 rounded-md hover:bg-slate-700 shadow shadow-md">
                <img alt="loop" src="/static/img/repeat.svg" width={32} height={32}></img>
            </button>
        </div>
        <script src="/static/js/player.js" defer />
    </div>
}