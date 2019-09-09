const mongoose = require('mongoose');

const Task = require('./models/task');
const Developer = require('./models/developer');

let url='mongodb://localhost:27017/week7';

mongoose.connect(url, function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
    
    
    // let task1 = new Task({
        
    //     name: "task1try",
    //     assignto:new mongoose.Types.ObjectId(),
    //     duedate: 2020/06/06,
    //     status:"In Progress",
    //     description:"trytrytry",


    // });

    
    // task1.save(function (err) {
    //     if (err) throw err;
    //     console.log('task1 successfully add to DB');
    // });
});

//trytrytrytrytyrtrytyryt