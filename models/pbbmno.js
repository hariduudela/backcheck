const mongoose = require('mongoose');

var ppbmnoSchema =  mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 300000 }
});
module.exports =  mongoose.model('ppbmno', ppbmnoSchema);
