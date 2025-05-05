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
  const track = await db.query(sql, value);
  return track;
}

export async function getPlaylists() {
  const sql = `
SELECT * FROM playlists
`;
  const playlists = await db.query(sql);
  return playlists;
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
  return newPlaylist; //do i need to do newPlaylist.rows[0].  If so, why and how do I know I need to do this?
}

export async function getTracks(id) {
  const sql = `
    SELECT *
    FROM tracks
    WHERE `;
}
