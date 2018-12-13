const mongoose = require('mongoose');

const EmailSchema = mongoose.Schema({
    
    email : {
        type : String,
        required: true
    } ,
    message : {
        type : String,
        required : true
    },
    subject : {
        type: String
    }
});

module.exports = mongoose.model('Email', EmailSchema)