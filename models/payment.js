const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email : {type:String, required:true},
    name: {type:String, required:true},
    idcard:{type:String, required:true},
    fee:{type:String},
    ppbmno:{type:String, required: true},
    paymentid:{type:String,required: true},
    paymentdate:{type:String, required: true},
    paymentstatus:{type:String,required: true},
    userid:{type:String, required:true},
    

});
module.exports = mongoose.model('Payment', paymentSchema)