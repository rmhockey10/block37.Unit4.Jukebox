import db from "#db/client";

export async function getTracks() {
  const sql = `
    SELECT * FROM tracks
    `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}

export async function getTrack(id) {
  const sql = `
    SELECT * FROM tracks
    WHERE id = $1
    `;
  const value = [id];
  const { rows: track } = await db.query(sql, value);
  return track[0];
}

export async function getPlaylists() {
  const sql = `
SELECT * FROM playlists
`;
  const playlists = await db.query(sql);
  return playlists.rows;
}

export async function getPlaylistById(id) {
  const sql = `
    SELECT *
    FROM playlists
    WHERE id = $1
    `;

  const value = [id];
  const playlist = await db.query(sql, value);
  return playlist.rows[0];
}

export async function createNewPlaylist(name, description) {
  const sql = `
INSERT INTO playlists
(name, description)
VALUES
($1, $2)
RETURNING *
`;
  const values = [name, description];
  const newPlaylist = await db.query(sql, values);
  return newPlaylist.rows[0]; //do i need to do newPlaylist.rows[0].  If so, why and how do I know I need to do this?
}

export async function getPlaylistTracks(id) {
  const sql = `
    SELECT *
    FROM tracks
    JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id
    WHERE playlists_tracks.playlist_id = $1
    `;

  const value = [id];
  const res = await db.query(sql, value);
  return res.rows;
}

export async function addTrackToPlaylist(playlist_id, track_id) {
  const sql = `
    INSERT INTO playlists_tracks
    (playlist_id, track_id)
    VALUES
    ($1, $2)
    RETURNING*
    `;
  const values = [playlist_id, track_id];
  const res = await db.query(sql, values);
  return res.rows[0];
}
