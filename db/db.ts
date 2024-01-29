import { Database } from "bun:sqlite"
const db = new Database("./data.db");
type DbClient = Record<string, Record<string, Query<any>>>;

type PrependDollar<T> = {
    [K in keyof T as `$${string & K}`]: T[K];
};
type Query<TSchema> = (() => void) | ((input: any) => TSchema[] | TSchema)
export type InsertQuery<TSchema> = (input: PrependDollar<TSchema>) => void;
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
    },

    [Symbol.dispose]() {
        db.close()
    }
} as const satisfies DbClient;

export default client;