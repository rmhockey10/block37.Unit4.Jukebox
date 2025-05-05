import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  createNewPlaylist,
  getPlaylistById,
  getPlaylistTracks,
  addTrackToPlaylist,
} from "#db/queries";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  if (playlists.length < 1) return res.send("There are no playlists");
  return res.send(playlists);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body missing");
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Missing name and/or description");
  const newPlaylist = await createNewPlaylist(name, description); //Does an id need to be sent as an argument?  If so, why?
  return res.status(201).send(newPlaylist);
});

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("invalid request parameter");

  const playlist = await getPlaylistById(id);
  if (!playlist) {
    return res.status(404).send("Playlist does not exist");
  }
  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
  return res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("invalid request parameter");
  }
  const tracks = await getPlaylistTracks(id);
  if (tracks.length < 1)
    return res.status(404).send("Playlist does not have any tracks");
  return res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("missing request body");
    const { trackId } = req.body;

    console.log(req.body);
    if (!trackId) return res.status(400).send("missing required field(s)");

    if (!/^\d+$/.test(trackId))
      return res.status(400).send("invalid request parameter");

    const { id } = req.params;

    const trackToPlaylist = await addTrackToPlaylist(id, trackId);
    console.log("TRACK PLAYLIST->", trackToPlaylist);
    return res.status(201).send(trackToPlaylist);
  } catch (err) {
    console.log(err);
    return res.status(400).send("PROBLEMS");
  }
});
