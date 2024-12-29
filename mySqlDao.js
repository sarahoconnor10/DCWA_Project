var pmysql = require("promise-mysql");

pmysql.createPool({
    connectionLimit : 3,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'proj2024mysql'
    })
    .then(p => {
        pool = p
    })
    .catch(e => {
        console.log("pool error:" + e)
   });

var getStudents = function() {
    return new Promise((resolve, reject) => {
        pool.query('select * from student order by sid asc')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = {getStudents};