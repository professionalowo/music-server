# music-server

Simple self-hosted music server using Typescript, React, Hono, Tailwind and Bun.

The backend in written in Typescript using the [hono](https://github.com/honojs/hono) framework.
Hono, together with React powers the server side rendered frontend.
The database is implemented using bun:sqlite and a typescript layer for typesafety.

Also features custom gzip middleware handler.
