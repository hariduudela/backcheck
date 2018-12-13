const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email : {type:String, required:true},
    name: {type:String, required:true},
    idcard:{type:String, required:true},
    dob:{type:String, required:true},
    gender:{type:String, required:true},
    city:{type:String, required:true},
    address:{type:String, required:true},
    state:{type:String, required:true},
    postcode:{type:String, required:true},
    mobilenumber:{type:String, required:true},
    status:{type:String, required: true},
    employee:{type:String, required:true},
    prepassvalue:{type:String, required: true},
    password:{type:String, required:true},
    creation_dt:{type:Date}

});
module.exports = mongoose.model('Employee', employeeSchema)