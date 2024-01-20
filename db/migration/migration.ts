import db from "../db";

const createSongTableQuery = db.query("CREATE TABLE IF NOT EXISTS songs (name TEXT PRIMARY KEY, uri TEXT NOT NULL, artist TEXT NOT NULL, FOREIGN KEY(artist) REFERENCES artists(name))");
createSongTableQuery.run();
const createArtistTableQuery = db.query("CREATE TABLE IF NOT EXISTS artists (name TEXT PRIMARY KEY)");
createArtistTableQuery.run();
const createArtistIndexOnSongTable = db.query("CREATE INDEX IF NOT EXISTS artist_idx on songs(artist)");
createArtistIndexOnSongTable.run();
const createArtistTriggerOnSongTable = db.query("CREATE TRIGGER IF NOT EXISTS artist_trigger AFTER INSERT ON songs BEGIN SELECT 1 FROM artists WHERE name = NEW.artist LIMIT 1; INSERT OR IGNORE INTO artists(name) VALUES (NEW.artist); END;");
createArtistTriggerOnSongTable.run();

type PrependDollar<T> = { [K in keyof T as `$${string & K}`]: T[K] };

export type InsertQuery<TSchema> = (input: PrependDollar<TSchema>) => void;
export type GetAllQuery<TSchema> = () => TSchema[];
export type WhereQuery<TSchema, TFiltered extends keyof TSchema> = (where: PrependDollar<Pick<TSchema, TFiltered>>) => TSchema[];
export type ArtistSchema = { name: string };
export type SongSchema = { name: string, uri: string, artist: string };


export const insertIntoSongQuery: InsertQuery<SongSchema> = (input) => db.query("INSERT INTO songs (name,uri,artist) values ($name,$uri,$artist)").run(input);
export const insertIntoArtistQuery: InsertQuery<ArtistSchema> = (input) => db.query("INSERT INTO artists (name) values ($name)").run(input);

export const getAllSongsQuery: GetAllQuery<SongSchema> = () => (db.query("SELECT * FROM songs").all()) as SongSchema[]
export const getAllArtistsQuery: GetAllQuery<ArtistSchema> = () => (db.query("SELECT * FROM artists").all()) as SongSchema[]

export const getSongsByArtistQuery: WhereQuery<SongSchema, "artist"> = (where) => (db.query("SELECT * FROM songs WHERE artist = $artist").all(where)) as SongSchema[]





//createArtistTriggerOnSongTable.run();