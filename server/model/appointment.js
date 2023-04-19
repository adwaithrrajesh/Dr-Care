const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const appointmentSchema = mongoose.Schema({
    doctorId:{
        type: ObjectId,
        ref:'doctor'
    },
    userId:{
        type: ObjectId,
        ref:'user'
    },
    date:{
        type:Date,
        require:true
    },
    startingTime:{
        type: String,
        require: true
    },
    endingTime:{
        type:String,
        require:true
    },
    slot:{
        type:Number,
        require:true
    }
});

module.exports = mongoose.model('appointment', appointmentSchema);