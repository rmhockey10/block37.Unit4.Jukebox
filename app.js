import express from "express";
const app = express();
export default app;

//Parse JSON request bodies.  You need to do this because...
app.use(express.json());

//Simple logging middleware.  This is here because...
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

//routing middleware to make your file 'dry'er...
//meaning if there are multiple routes that use the same endpoints
//you can use this syntax to remove multiple the amount of times
//that endpoint is written.  This helps in the event you need to change your
//endpoint, this reduces the amount of times to do it, decreasing the chance
//of a miss change and causes an error
app.use("/tracks", tracksRouting);
app.use("/playlists", playlistsRouting);

//Catch-all error-handling middleware
//this middleware catches what was not picked up from the routes held in the
//above middleware.  This helps communicate where the program failed and
//eliminates a point where your app would crash.

app.use((err, req, req, next) => {
  console.log(err);
  res.status(500).send("it's not you, it's me");
});

//why in the first app.use the first of parameter is 'request' and the second app.use is 'error'?
//and so forth for 2nd, 3rd, 4th parameters - why do they differ?
