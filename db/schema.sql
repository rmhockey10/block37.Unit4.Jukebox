-- TODO
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS playlists_tracks CASCADE;
DROP TABLE IF EXISTS tracks CASCADE;

\echo ***Creating table named playlists***
CREATE TABLE playlists(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

\echo ***Creating table named tracks***
CREATE table tracks (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    duration_ms INTEGER NOT NULL
);

\echo ***Creating table named playlists_tracks***
CREATE table playlists_tracks (
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    track_id INTEGER NOT NULL REFERENCES tracks (id) ON DELETE CASCADE,
    UNIQUE (playlist_id, track_id)
);