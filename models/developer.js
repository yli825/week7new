const mongoose = require('mongoose');
let developerSchema = mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String, 
        require: true ,
        validate: {
            validator: function (level) {
                return (level== "BEGINNER" || level=="EXPERT");
            },
            message: 'level should be either Beginner or Expert'
        }      
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String,
    },
});
module.exports = mongoose.model('Developer', developerSchema);