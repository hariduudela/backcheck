const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    telnumber:{type:String},
    ceremah:{type:String},    
    plan:{type:String},
    fee:{type:String},
    race:{type:String, required:true},
    ostate:{type:String, required:true},
    division:{type:String, required:true},
    branch:{type:String, required:true},
    vocation:{type:String, required:true},
    status:{type:String, required: true},
    country:{type:String, required: true},
    month:{type:String, required: true},
    year:{type:String, required: true},
    voter:{type:String, required: true},
    ppbmno:{type:String, required: true},
    paymentid:{type:String,required: true},
    paymentdate:{type:String, required: true},
    paymentstatus:{type:String,required: true},
    password:{type:String, required:true},
    userid:{type:String, required:true},
    photo:{type:String},
    photopath:{type:String},
    photoidpath:{type:String},
    photoid:{type:String},
    lanjuntan:{type:String},
    aktiviti:{type:String},
    creation_dt:{type:String},
    prepassvalue:{type:String, required:true},

});



module.exports = mongoose.model('User', userSchema)