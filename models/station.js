

const db = require('../db') //will automatically look for index file if file is not specified


function random() {
  let sql = "SELECT * FROM stations order by random() LIMIT 1;"
  
  return db.query(sql)
}

function stats() {
  let sql =
    "SELECT owner, count(*) as count FROM stations GROUP BY owner HAVING count(*) > 1 ORDER BY count desc";

  return db.query(sql)
}

function allStations() {
  let sql = "SELECT * FROM stations;";

  return db.query(sql)
}

function owners() {
  let sql = "SELECT DISTINCT ON (owner) owner FROM stations;";

  return db.query(sql)
}

const Station =  {
    random,
    stats,
    allStations,
    owners
}
  

module.exports = Station