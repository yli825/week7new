const mongoose = require('mongoose');
const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');

const app = express()

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(express.static('images'));

app.use(bodyparser.urlencoded({ extended: false }));


const Task = require('./models/task');
const Developer = require('./models/developer');

let url='mongodb://localhost:27017/week7';

mongoose.connect(url, function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
    
    

});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/insertdeveloper.html');
});

app.post('/addnewdeveloper', function (req, res) {
    let taskDetails = req.body;
    let developer = new Developer({     
        name: {
            firstName:taskDetails.firstname,
            lastName:taskDetails.lastname,
        },
        level: taskDetails.level.toUpperCase(),
        address: {
            state: taskDetails.state,
            suburb: taskDetails.suburb,
            street: taskDetails.street,
            unit:taskDetails.unit
        },
    });
    developer.save(function (err) {
        if (err) throw err;
        console.log('deceloper successfully Added to DB')
    });
    res.redirect('/getdeveloper'); 
});



app.get('/getdeveloper', function (req, res) {
    Developer.find({},function (err,docs) {
        console.log(docs);
        res.render('listdeveloper', { developerDb: docs });   
})
});


app.get('/inserttask', function (req, res) {
    res.sendFile(__dirname + '/views/inserttask.html');
});

app.post('/addnewtask', function (req, res) {
    let taskDetails = req.body;
    let task = new Task({     
        name: taskDetails.taskname,
        assignto: taskDetails.assignto,
        duedate: taskDetails.duedate,
        taskstatus: taskDetails.taskstatu,
        description:taskDetails.taskdescription,
    });
    task.save(function (err) {
        if (err) throw err;
        console.log('task successfully Added to DB')
    });
    res.redirect('/gettask'); 
});



app.get('/gettask', function (req, res) {
    
    Task.find({},function (err,docs) {
        //console.log(docs);
        res.render('listtask', { taskDb: docs });   
})
});

app.get('/deletetasks', function (req, res) {
    res.sendFile(__dirname + '/views/deletetasks.html');
});
app.post('/deletetaskdata', function (req, res) {
    let taskDetails = req.body;
    //let filter = { "_id": "taskDetails.taskid"};
    

    Task.deleteOne({ "_id": taskDetails.taskid}, function (err, doc) {
        console.log(doc);
    });
    res.redirect('/gettask');
});

app.get('/deletealltask', function (req, res) {
    
    Task.find({"taskstatus":"Complete"},function (err, docs) {
        
    res.render('deleteallcom', { taskDb: docs });
    })
});
app.post('/deletealldata', function (req, res) {
    Task.deleteMany({"taskstatus":"Complete"},function (err, docs) {})
    res.redirect('/gettask');// redirect the client to list users page
});


app.get('/updatetask', function (req, res) {
    res.sendFile(__dirname + '/views/updatetask.html');
});
app.post('/updatetaskdata', function (req, res) {
    let taskDetails = req.body;
    Task.updateOne({ "_id": taskDetails.taskid},{ $set: { 'taskstatus': taskDetails.newtaskstatus } } ,function (err, doc) {
    });
    res.redirect('/gettask');
});







app.listen(8080);


