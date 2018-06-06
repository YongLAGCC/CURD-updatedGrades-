const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');



var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

var grades = [
    {
        id: 1, 
        name: 'Eric',
        grade: "A",
    }, 
    {
        id: 2, 
        name: 'Joanna',
        grade: "B-",
    }
];

var currentId = 2; 
app.get('/grades', function(req, res){ 
    res.send({grades:grades});
})

app.use(bodyParser.json()); // 为了从 ajax 中抛出的json 数据 

app.post('/grades', function(req, res){ // use bodyparser to get the data from server sent by stringigy....
    var studentName = req.body.name; 
    var studentGrade = req.body.grade; 
   
    currentId ++; 
     
    grades.push({
        id: currentId, 
        name: studentName,
        grade: studentGrade,
    })
    res.send("Successly posted")

})

app.put('/grades/:id', function(req, res){
    var id = req.params.id; 
    var newName = req.body.newName; 
    var newGrade = req.body.newGrade; 
    var found = false; 
    //console.log(newGrade + " gread")
    grades.forEach(function(element, index) {
        if(!found && element.id === Number(id)) {
            element.name = newName; 
            element.grade = newGrade; 
        }
    })
    res.send("successfully updated grade");
})

app.delete('/grades/:id', function(req, res){
    var id = req.params.id; 
    var found = false; 
    //array.forEach(function(currentValue, index, arr), thisValue)
    grades.forEach(function(currentValue, index){
        if(!found && currentValue.id === Number(id)){
            grades.splice(index, 1);
        }

    }) 
    res.send ('successfully deleted this id' +id);
})

app.listen(PORT, function() {
    console.log("App is listening to port:  " + PORT);
});


