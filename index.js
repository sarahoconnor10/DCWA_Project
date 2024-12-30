/*
DCWA PROJECT 2024
Reqs:
TO DO LIST
  - Handle HTTP routes + methods:
    - GET and POST /students/edit/:sid
          - if invalid input 
            - error messages are displayed
            - invalid data is not entered into db
    - GET and POST /students/add
          - validate data
            - student id length == 4
            - student id must be unique
            - name length > 1
            - age > 18
          - if invalid input
            - page returned with error messages 
            - invalid data is not entered into db
    - GET /lecturers/delete/:lid
        - when 'delete' is clicked on lecturer's page
        - if lecturer does not teach modules
          - can be deleted
          - return to lecturers page
        - else
          - display error message page 
          - <h1> Error message
          - <h2> cannot delete lecturer <lid>. 
          - do not delete from db     
*/

var express = require("express");
var app = express();
var ejs = require("ejs");
var mySQLDao = require("./mySQLDao");
var bodyParser = require("body-parser");
var { check, validationResult } = require("express-validator");
var mongoDao = require("./mongoDao");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3004, () => {
  console.log("running on port 3004");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/students", (req, res) => {
  mySQLDao
    .getStudents()
    .then((data) => {
      res.render("students", { students: data });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/students/edit/:sid", (req, res) => {
  mySQLDao
    .getStudent(req.params.sid)
    .then((data) => {
      res.render("updateStudent", { student: data[0] });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post(
  "/students/edit/:sid",
  [
    check("name")
      .isLength({ min: 2 })
      .withMessage("Student Name should be at least 2 characters"),
    check("age")
      .isInt({ gt: 18 })
      .withMessage("Student Age should be at least 18"),
  ],
  (req, res) => {
    const errors = validationResult(req);
/**
 * app.post('/addStudent',
[
check("id").isLength({min:1})
.withMessage("Please enter ID")
],
(req, res) => {
const errors = validationResult(req)
if (!errors.isEmpty()) {
res.render("addStudent",
{errors:errors.errors})
} else {
// Further processing on
 // user supplied data
}
})
body>
<h1>Add Student</h1>
<% if (errors != undefined) { %>
<ul>
<% errors.forEach((error) => { %>
<li><%= error.msg %></li>
<% }) %>
</ul>
<% } %>
<form action="/addStudent" method="POST">
<label>ID:</label>
<input type="text" name="id"><br>
<label>Name</label>
<input type="text" name="name"><br>
<label>Course</label>
<input type="text" name="course"><br>
<input type="submit" value="OK">
</form>
 */
    const data =
    {
      name : req.body.name,
      age : req.body.age,
      sid : req.params.sid
    }

    // if(!errors.isEmpty()){
    //   return res.render("updateStudent", { student : data, errors: errors.errors})
    // } else {
        mySQLDao
          .updateStudent(data.sid, data.name, data.age)
          .then(() => {
            res.redirect("/students");
          })
          .catch((error) => {
            res.send(error);
          });
    }
    
  //}
);

app.get("/students/add", (req, res) => {
  res.render("addStudent");
});

app.post("/students/add", (req, res) => {
  const data = {
    sid: req.body.sid,
    name: req.body.name,
    age: req.body.age
  }
  mySQLDao
    .addStudent(data.sid, data.name, data.age)
    .then(() => {
      res.redirect("/students");
    })
    .catch((error) => {
      res.send(error);
    })
});

app.get("/grades", (req, res) => {
  mySQLDao
    .getGrades()
    .then((data) => {
      res.render("grades", { students: data });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/lecturers", (req, res) => {
  mongoDao.findAll()
    .then((data) => {
      res.render("lecturers", {lecturers: data})
    })
    .catch((error) => {
      res.send(error);
    })
});

app.get("/lecturers/delete/:lid", (req, res) => {
  mySQLDao.getLecturerModules(req.params.lid)
    .then((result) => {
      if(result.length !== 0) {
        //cannot delete, lecturer has correlating modules
        return res.render("lecturers", {
          lecturers: [],
          error: "Cannot delete Lecturer " + req.params.lid + ", as they are teaching " + result.length + " modules."
        });
      }
      else{
        return mongoDao.deleteLecturer(req.params.lid)
          .then(() => {
            mongoDao.findAll()
            .then((data) => {
              res.render("lecturers", { lecturers : data});
            });
          })
          .catch((error) => {
            res.send(error);
          })
      }
    })
});

/** COMPLETED TASKS
  - run on port 3004
  - GET / 
        - home page
        - <h1> student number 
        - 3 links
          - Students page
          - Grades Page
          - Lecturers Page
  - GET /students
        - students page
        - <h1> Students
        - 3 elements
          - Add student link
          - Home link
          - Student table
            - displays student details
              - Student ID, name, age
              - Update option
            - Alphabetical order by student id
     - GET and POST /students/edit/:sid
        - Update student page
        - <h1> Update student
        - link to home page
        - 3 inputs 
          - Student ID (NOT editable)
          - name (min 2 chars)
          - age (> 18)
        - 'add' button
          - if valid input
            - redirect to students page
    - GET and POST /students/add
        - Add student page
        - <h1> Add student
        - Link to home page
        - 3 input fields
          - student id
          - name
          - age
        - 'add' button
         - if valid input
            - return to students page
    - GET /grades
        - Grades page
        - <h1> Grades
        - Link to home page
        - table display for each student + each module they study
          - Student name
          - Module
          - Grade
          - if student has no modules 
            - just display student name + blank cells
          - displayed in alphabetical order by student name
            - if a student has > 1 modules
              - order by ascending grades
    - GET /lecturers
          - lecturers page (mongoDB)
          - <h1> Lecturers
          - Link to home page
          - table display for each lecturer
            - Lecturer id
            - name
            - department id
            - action - delete
            - displayed in alphabetical order by lecturer id

 */
