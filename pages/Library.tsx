import client from "@db/db";

export const Library = () => {
    const artists = client.artists.getAll();
    return <div>
        <p>Available Artists: {artists.length}</p>
        <ul class="flex flex-col gap-3">
            {artists.map(({ name }) => <li><a href={`/library/${name}`}>{name}</a></li>)}
        </ul>
    </div>
}

