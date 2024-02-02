import { Database } from "bun:sqlite"
const db = new Database("./data.db");

const createSongTableQuery = db.query("CREATE TABLE IF NOT EXISTS songs (name TEXT PRIMARY KEY, uri TEXT NOT NULL, artist TEXT NOT NULL, FOREIGN KEY(artist) REFERENCES artists(name))");
createSongTableQuery.run();
const createArtistTableQuery = db.query("CREATE TABLE IF NOT EXISTS artists (name TEXT PRIMARY KEY)");
createArtistTableQuery.run();
const createArtistIndexOnSongTable = db.query("CREATE INDEX IF NOT EXISTS artist_idx on songs(artist)");
createArtistIndexOnSongTable.run();
const createArtistTriggerOnSongTable = db.query("CREATE TRIGGER IF NOT EXISTS artist_trigger AFTER INSERT ON songs BEGIN SELECT 1 FROM artists WHERE name = NEW.artist LIMIT 1; INSERT OR IGNORE INTO artists(name) VALUES (NEW.artist); END;");
createArtistTriggerOnSongTable.run();

const createAlbumTableQuery = db.query("CREATE TABLE IF NOT EXISTS albums (name TEXT PRIMARY KEY, artist TEXT NOT NULL, FOREIGN KEY(artist) REFERENCES artists(name))");
createAlbumTableQuery.run();
const createArtistIndexOnAlbumsTable = db.query("CREATE INDEX IF NOT EXISTS artist_idx on albums(artist)");
createArtistIndexOnAlbumsTable.run();