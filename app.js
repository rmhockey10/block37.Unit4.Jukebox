import express from "express";
const app = express();
export default app;

import tracksRouting from "#api/tracksRouting";
import playlistsRouting from "#api/playlistsRouting";

//Parse JSON request bodies.  By default, Express does not accept JSON, so we need to add this line
//for Express to be able to translate JSON into something it can read.
app.use(express.json());

//Simple logging middleware.  This logs the method of the request and the request's URL in the terminal.
app.use((req, res, next) => {
  // console.log(`${req.method} ${req.originalUrl}`);
  next();
});

//below is routing middleware to make your file 'dry'er...
//meaning if there are multiple routes that use the same endpoints
//you can use this syntax to decrease the amount of times
//that endpoint is written.  This helps in the event you need to change your
//endpoint, this reduces the amount of times to do it, decreasing the chance
//of a miss change and causes an error.
//This also, and probably more importantly, creates a more coherant and organized project structure.
//This allows you to move routes outside of app.js into their own file.
app.use("/tracks", tracksRouting);
app.use("/playlists", playlistsRouting);

//Catch-all error-handling middleware
//this middleware catches what was not picked up from the routes held in the
//above middleware.  This helps communicate where the program failed and
//eliminates a point where your app would crash.

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("it's not you, it's me");
});

//why in the first app.use the first of parameter is 'request' and the second app.use is 'error'?
//and so forth for 2nd, 3rd, 4th parameters - why do they differ?
