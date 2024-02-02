import type { Child } from "hono/jsx";

export function AdminLayout({ children }: { children: Child | undefined }) {
    return <div class="flex w-full">
        <aside class="flex h-full bg-slate-600 px-3">
            <ul class="h-full flex flex-col">
                <li>
                    <a href="/admin/songs" class="flex gap-3">
                        <img src="/static/img/music-note-beamed.svg"/><span>Songs</span>
                    </a>
                </li>
                <li>
                    <a href="/admin/artists" class="flex gap-3">
                        <img src="/static/img/person-circle.svg"/><span>Artists</span>
                    </a>
                </li>
                <li>
                    <a href="/admin/albums" class="flex gap-3">
                        <img src="/static/img/disc.svg" alt="disk"/><span>Albums</span>
                    </a>
                </li>
            </ul>
        </aside>
        <div class={"flex grow w-full justify-center"}>{children}</div>
    </div>
}