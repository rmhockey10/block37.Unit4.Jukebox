//in order to use express's routing middleware, you need to import the library
import express from "express";
//The syntax on line is grabbing the routing function in Express that holds all routing methods.
const router = express.Router();
//I'm exporting the variable I named on line so I can use it elsewhere in the app.
export default router;

import { getTracks, getTrack } from "#db/queries";

//the API will expect a request with the method GET, so we use the syntax on the next line to handle
//the request.  The callback function is async because there is a function inside of it that is also
// async that you awaiting the response to. getTracks() needs to talk to the database, which is outside
// of this file, which takes time so we need to give the time it needs, which we can do by putting 'await' in front of it.
router.get("/", async (req, res) => {
  //once getTracks() returns a value, it's placed into the variable 'tracks'.
  const tracks = await getTracks();
  //then we send that content back as the response using the below syntax.
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  //here we are pulling out the the id of the track which was provided via the request.
  //Express sees the ':' and knows to create an object in the request with the key name as whatever arbitrary name you give in the URL segment
  //that's define in the first argument of the .get() method and the value of that key as whatever was typed in the URL and placing it
  //inside of an object called 'params'.
  //below we are grabbing the value assigned to the key inside of the object named params
  const { id } = req.params;
  //in the req body, 'id' is a string.  Below we are taking what's inside .test(), and checking to see
  //if it's characters are numeric.  If it's not, it throws an error and ends the middleware computation.
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("invalid request parameter");
  }
  const track = await getTrack(id);
  if (!track) return res.status(404).send("track not found");
  res.send(track);
});
