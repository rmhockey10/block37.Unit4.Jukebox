//in order to use express routing middleware, you need to import the library
import express from "express";
//The syntax on line is doing what?
const router = express.Router();
//I'm exporting the variable I named on line 4 because...
export default router;

import { getTracks, getTrack } from "#db/queries";

//the API will expect a request with the method GET, so we use the syntax on the next line to handle
//the request.  the callback function is async because there is a function inside of it using 'await'
//(i'd like to word this better).  getTracks() needs to talk to the database, which takes time so we
//need to give the time it needs, which we can do by putting 'await' in front of it.
router.get("/", async (req, res) => {
  //once getTracks() returns a value, it's placed into the variable 'tracks'.
  const tracks = await getTracks();
  //then we send that content back as the response using the below syntax.
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  //here we are pulling out the the id of the track which was provided via the request.
  //.params has some specials powers which are...
  const { id } = req.params;
  //in the req body, 'id' is a string.  Below we are taking what's inside .test(), and checking to see
  //if it's characters are numeric.  If it's not, it throws an error and ends the middleware computation.
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("invalid request parameter");
  }
  const track = await getTrack(id);
  res.send(track);
});
