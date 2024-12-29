var pmysql = require("promise-mysql");

pmysql.createPool({
    connectionLimit : 3,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'studentdb4'
    })
    .then(p => {
        pool = p
    })
    .catch(e => {
        console.log("pool error:" + e)
   })

