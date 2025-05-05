import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO

  const tracks = [
    { name: "Track 1", duration_ms: 213000 },
    { name: "Track 2", duration_ms: 198000 },
    { name: "Track 3", duration_ms: 247000 },
    { name: "Track 4", duration_ms: 184000 },
    { name: "Track 5", duration_ms: 205000 },
    { name: "Track 6", duration_ms: 221000 },
    { name: "Track 7", duration_ms: 239000 },
    { name: "Track 8", duration_ms: 190000 },
    { name: "Track 9", duration_ms: 200000 },
    { name: "Track 10", duration_ms: 228000 },
    { name: "Track 11", duration_ms: 210000 },
    { name: "Track 12", duration_ms: 215000 },
    { name: "Track 13", duration_ms: 202000 },
    { name: "Track 14", duration_ms: 193000 },
    { name: "Track 15", duration_ms: 208000 },
    { name: "Track 16", duration_ms: 232000 },
    { name: "Track 17", duration_ms: 187000 },
    { name: "Track 18", duration_ms: 244000 },
    { name: "Track 19", duration_ms: 226000 },
    { name: "Track 20", duration_ms: 212000 },
  ];

  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];
    console.log(track);
    await createTrack(track);
  }

  const playlists = [
    { name: "playlist1", description: "Rock" },
    { name: "playlist2", description: "Jazz" },
    { name: "playlist3", description: "Hip Hop" },
    { name: "playlist4", description: "Classical" },
    { name: "playlist5", description: "Electronic" },
    { name: "playlist6", description: "Reggae" },
    { name: "playlist7", description: "Country" },
    { name: "playlist8", description: "Pop" },
    { name: "playlist9", description: "Funk" },
    { name: "playlist10", description: "Blues" },
  ];

  for (let i = 0; i < playlists.length; i++) {
    const playlist = playlists[i];
    console.log(playlist);
    await createPlaylist(playlist);
  }

  const junction_table = [];
  const seen = new Set();

  while (junction_table.length < 30) {
    const playlist_id = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const track_id = Math.floor(Math.random() * 20) + 1; // 1 to 20

    const key = `${playlist_id}-${track_id}`;

    if (!seen.has(key)) {
      seen.add(key);
      junction_table.push({ playlist_id, track_id });
    }
  }

  for (let i = 0; i < junction_table.length; i++) {
    const junction_tableEntry = junction_table[i];
    console.log(junction_tableEntry);
    await createJunctionTable(junction_tableEntry);
  }

  async function createJunctionTable(junction_table) {
    const sql = `
    INSERT INTO playlists_tracks
    (playlist_id, track_id)
    VALUES
    ($1, $2)
    RETURNING *
    `;

    const { playlist_id, track_id } = junction_table;
    const values = [playlist_id, track_id];
    const res = await db.query(sql, values);
    return res.rows[0];
  }

  async function createTrack(track) {
    const sql = `
    INSERT INTO tracks
    (name, duration_ms)
    VALUES
    ($1, $2)
    RETURNING *
    `;

    const { name, duration_ms } = track;
    const values = [name, duration_ms];
    const res = await db.query(sql, values);
    return res.rows[0];
  }

  async function createPlaylist(playlist) {
    const sql = `
    INSERT INTO playlists
    (name, description)
    VALUES
    ($1, $2)
    RETURNING *
    `;

    const { name, description } = playlist;
    const values = [name, description];

    const res = await db.query(sql, values);
    return res.rows[0];
  }
}
