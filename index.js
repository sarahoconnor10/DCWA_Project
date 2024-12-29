/*
DCWA PROJECT 2024
Reqs:
  - run on port 3004
  - Handle HTTP routes + methods:
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
          - if invalid input 
            - error messages are displayed
            - invalid data is not entered into db
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
          - validate data
            - student id length == 4
            - student id must be unique
            - name length > 1
            - age > 18
          - if invalid input
            - page returned with error messages 
            - invalid data is not entered into db
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
let ejs = require("ejs");
app.set('view engine', 'ejs');
var mySQLDao = require("./mySQLDao"); 

app.listen(3004, () => {
    console.log("running on port 3004");
  });

app.get("/", (req, res) => {
    res.render("home");
});