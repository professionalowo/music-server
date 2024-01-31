import { type Child } from "hono/jsx";
import { Navbar } from "./Navbar";

export function Layout({ children }: { children: Child | undefined }) {

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/static/img/music-note-beamed.svg" type="image/svg" sizes="16x16"></link>
                <link href="/static/css/output.css" rel="stylesheet"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <title>Deez Nuts</title>
                <script src="https://unpkg.com/htmx.org@1.9.10" defer></script>
            </head>
            <body class="bg-slate-900 text-slate-200 min-w-screen text-xl min-h-screen">
                <Navbar />
                <div class="p-3 flex justify-center items-center h-fit w-full">{children}</div>
            </body>
        </html>
    )
}