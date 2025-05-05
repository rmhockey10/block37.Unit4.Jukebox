import express from "express";
const router = express.Router();
export default router;

import {
  getPlaylists,
  createPlaylist,
  getPlaylistById,
  getTracks,
} from "#db/queries";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  if (!playlists) return res.status(404).send("There are no playlists");
  return res.send(playlists);
});

router.post("/", async (req, res) => {
  console.log(req);
  if (!req.body) return res.status(400).send("Request body missing");
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Missing name and/or description");
  const newPlaylist = await createNewPlaylist(name, description); //Does an id need to be sent as an argument?  If so, why?
  return res.send(newPlaylist);
});

router.param("/:id", async (req, res, next, id) => {
  //do i need regex here???  I think so...need to make sure what is given to the below function is numeric
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
  tracks = await getTracks(id);
  if (!tracks) return res.status(404).send("Playlist does not have any tracks");
  return res.send(tracks);
});
