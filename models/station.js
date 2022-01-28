

const db = require('../db') //will automatically look for index file if file is not specified

const Station =  {
    random() {
      let sql = "SELECT * FROM stations order by random() LIMIT 1;"
  
     return db.query(sql)
    }
    
  }
  

module.exports = Station