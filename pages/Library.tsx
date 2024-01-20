import client from "@db/db";

export const Library = () => {

    const artists = client.artists.getAll();
    return <ul class="flex flex-col gap-3">{artists.map(({ name }) => <li><a href={`/library/${name}`}>{name}</a></li>)}</ul>
}

