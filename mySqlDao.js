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

var getStudent = function(sid) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "SELECT * from student where sid = ?",
            values: [sid]
        };
        pool.query(myQuery)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

var updateStudent = function(sid, name, age) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "UPDATE student SET name = ?, age = ? WHERE sid = ?",
            values: [name, age, sid]
        };
        pool.query(myQuery)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            })
    })
}

var addStudent = function(sid, name, age) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "INSERT INTO student VALUES (?, ?, ?)",
            values: [sid, name, age]
        };
        pool.query(myQuery)
        .then(() => {
            resolve();
        })
        .catch((error) => {
            reject(error);
        })
    })
}

var getGrades = function() {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "SELECT IF(s.name IS NULL, '', s.name) AS name, IF(m.name IS NULL, '', m.name) AS module, IF(g.grade IS NULL, '', g.grade) AS grade FROM student s LEFT JOIN grade g ON s.sid = g.sid LEFT JOIN module m ON g.mid = m.mid ORDER BY s.name ASC, g.grade ASC;" 
        };
        pool.query(myQuery)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

var getLecturerModules = function(id) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "SELECT * FROM module WHERE lecturer = ?",
            values: [id]
        };
        pool.query(myQuery)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = {getStudents, getStudent, updateStudent, addStudent, getGrades, getLecturerModules};