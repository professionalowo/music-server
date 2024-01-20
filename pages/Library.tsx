import { getAllArtistsQuery } from "../db/migration/migration"

export const Library = () => {

    const artists = getAllArtistsQuery();
    console.log(artists);
    return <ul class="flex flex-col gap-3">{artists.map(({ name }) => <li><a href={`/library/${name}`}>{name}</a></li>)}</ul>
}

