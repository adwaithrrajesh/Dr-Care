const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const bookedAppointmentSchema = mongoose.Schema({
    userId:{
        type: ObjectId,
        ref:'users'
    },
    doctorId:{
        type: ObjectId,
        ref:'doctors'
    },
    appointmentId:{
        type : ObjectId,
        ref:'appointments'
    },
    cancelled:{
        type: Boolean,
        default : false
    },
    appointmentStatus:{
        type: Boolean
    },
    date:{
        type: Date,
        require: true
    },
    time:{
        type: String,
        require:true
    },
    amountPaid:{
        type:Number,
        require:true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('BookedAppointment', bookedAppointmentSchema);