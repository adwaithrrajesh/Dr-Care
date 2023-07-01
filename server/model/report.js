const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const reportSchema = mongoose.Schema({
    userId:{
        type: ObjectId,
        ref:'users'
    },
    doctorId:{
        type: ObjectId,
        ref:'doctors'
    },
    description:{
        type: String,
        require:true
    }
});

module.exports = mongoose.model('report', reportSchema);