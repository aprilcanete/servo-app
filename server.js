const express = require("express");
const res = require("express/lib/response");
const app = express();
const PORT = 8080 || process.env.PORT;
const Station = require('./models/station.js')

const { Pool } = require("pg");

const pool = new Pool({
  database: "servo_app_db",
});

app.use(express.static("public"));


app.get("/", (req, res) => {
  res.send("hello");
});

// Level 1 quest : GET /api/stations/all
app.get("/api/stations/all", (req, res) => {
  let sql = "SELECT * FROM stations;";

  pool.query(sql, (err, dbRes) => {
    res.json(dbRes.rows);
  });
});

app.get("/api/stats", (req, res) => {
  let sql =
    "SELECT owner, count(*) as count FROM stations GROUP BY owner HAVING count(*) > 1 ORDER BY count desc";

  pool.query(sql, (err, dbRes) => {
    res.json(dbRes.rows);
  });
});

app.get("/api/owners", (req, res) => {
  let sql = "SELECT DISTINCT ON (owner) owner FROM stations;";

  pool.query(sql, (err, dbRes) => {
    res.json(dbRes.rows);
  });
});

app.get("/api/stations/random", (req, res) => {
  // let randNum = Math.floor(Math.random() * 5234);
  // let sql = `SELECT * FROM stations WHERE id = ${randNum} LIMIT 1;`;

  // let sql = "SELECT * FROM stations order by random() LIMIT 1;"

  // pool.query(sql, (err, dbRes) => {
  //   res.json(dbRes.rows);
  // });

  Station
    .random()
    .then(dbRes => {
    res.json(dbRes.rows)
  })

});

app.listen(PORT, () => {
  console.log(`server listening to ${PORT}`);
});
