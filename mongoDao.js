const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017")
  .then((client) => {
    db = client.db("proj2024MongoDB");
    coll = db.collection("lecturers");
  })
  .catch((error) => {
    console.log(error.message);
  });

  var findAll = function() {
    return new Promise((resolve, reject) => {
        var cursor = coll.find().sort({_id:1})
        cursor.toArray()
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
  }

  var deleteLecturer = function(id) {
    return new Promise((resolve, reject) => {
        coll.deleteOne({_id: id})
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            })
    })
  }

  module.exports = { findAll, deleteLecturer}
