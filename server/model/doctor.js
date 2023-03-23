const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    firstName: {
        type:String,
        require: true
    },
    lastName:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    block:{
        type:Boolean,
        default:false
    },
    idNumber:{
        type:Number
    },
    age:{
        type:Number
    },
    experience:{
        type:Number
    }
});

module.exports = mongoose.model('doctors', doctorSchema);