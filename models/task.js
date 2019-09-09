const mongoose = require('mongoose');
let taskSchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    
    assignto: mongoose.Schema.Types.ObjectId,
    
    duedate: {
        type: Date,
        
    },
    
    taskstatus: {
        type: String,  
        validate: {
            validator: function (status) {
                return status.equals("In progress") && status.equals("Complete");
            },
            message: 'status should be In progress or Complete'
        }      
    },
    
    description: {
        type: String,
        
    }
});
module.exports = mongoose.model('Task', taskSchema);