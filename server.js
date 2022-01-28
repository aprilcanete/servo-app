const express = require("express");
const res = require("express/lib/response");
const app = express();
const PORT = 8080 || process.env.PORT;
const Station = require('./models/station.js')

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hello");
});

// Level 1 quest : GET /api/stations/all
app.get("/api/stations/all", (req, res) => {
  Station
    .allStations()
    .then(dbRes => {
      res.json(dbRes.rows)
    })
});

app.get("/api/stations/random", (req, res) => {
  Station
    .random()
    .then(dbRes => {
    res.json(dbRes.rows)
  })
});

app.get("/api/stats", (req, res) => {
  Station
    .stats()
    .then(dbRes => {
      res.json(dbRes.rows)
    })
});

app.get("/api/owners", (req, res) => {
  Station
    .owners()
    .then(dbRes => {
      res.json(dbRes.rows)
    })
});


app.listen(PORT, () => {
  console.log(`server listening to ${PORT}`);
});
