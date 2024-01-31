import { Database } from "bun:sqlite"
const db = new Database("./data.db");

type PrependDollar<T> = {
    [K in keyof T as `$${string & K}`]: T[K];
};
type PrependFilter<T> = {
    [K in keyof T as `filter`]: T[K];
};

export type InsertQuery<TSchema> = (input: PrependDollar<TSchema>) => void;
export type AlterQuery<TSchema, TKey extends keyof TSchema, TFilteredFirst extends keyof TSchema, TFilteredSecond extends keyof TSchema> = (filter: PrependDollar<PrependFilter<Pick<TSchema, TKey>>>, updateFirst: PrependDollar<Pick<TSchema, TFilteredFirst>>, updateSecond: PrependDollar<Pick<TSchema, TFilteredSecond>>) => void
export type GetAllQuery<TSchema> = () => TSchema[];
export type WhereQuery<TSchema, TFiltered extends keyof TSchema> = (where: PrependDollar<Pick<TSchema, TFiltered>>) => TSchema[];
export type WhereQueryPkey<TSchema, TFiltered extends keyof TSchema> = (where: PrependDollar<Pick<TSchema, TFiltered>>) => [TSchema]
export type ArtistSchema = { name: string; };
export type SongSchema = { name: string; uri: string; artist: string; };


const insertIntoSongQuery: InsertQuery<SongSchema> = (input) => db.query("INSERT INTO songs (name,uri,artist) values ($name,$uri,$artist)").run(input);
const insertIntoArtistQuery: InsertQuery<ArtistSchema> = (input) => db.query("INSERT INTO artists (name) values ($name)").run(input);

const getAllSongsQuery: GetAllQuery<SongSchema> = () => (db.query("SELECT * FROM songs").all()) as SongSchema[];
const getAllArtistsQuery: GetAllQuery<ArtistSchema> = () => (db.query("SELECT * FROM artists").all()) as SongSchema[];

const getSongsByArtistQuery: WhereQuery<SongSchema, "artist"> = (where) => (db.query("SELECT * FROM songs WHERE artist = $artist").all(where)) as SongSchema[];
const getSongByNameQuery: WhereQueryPkey<SongSchema, "name"> = (where) => [(db.query("SELECT * FROM songs WHERE name = $name").get(where))] as [SongSchema]
const alterSongWhereName: AlterQuery<SongSchema, "name", "name", "artist"> = (filter, name, artist) => db.query("UPDATE songs SET artist=$artist, name=$name where name=$filter ").run({ ...filter, ...name, ...artist })

const client = {
    artists: {
        insert: insertIntoArtistQuery,
        getAll: getAllArtistsQuery
    },
    songs: {
        insert: insertIntoSongQuery,
        getByArtist: getSongsByArtistQuery,
        getByName: getSongByNameQuery,
        getAll: getAllSongsQuery,
        alterSongs: alterSongWhereName
    },

    [Symbol.dispose]() {
        db.close()
    }
} as const;

export default client;