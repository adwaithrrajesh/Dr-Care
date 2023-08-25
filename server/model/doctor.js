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
    qualification:{
        type:String
    },
    departmentName:{
        type:String
    },
    fee:{
        type:Number
    },
    experience:{
        type:Number
    },
    idCardImage:{
        type:String
    },
    certificateImage:{
        type:String
    },
    verificationStatus:{
        type:Boolean,
        default:false
    },
    showRequest:{
        type:Boolean,
        default:false
    },
    profilePhoto:{
        type:String,
        default:"https://img.freepik.com/premium-vector/cartoon-male-doctor-holding-clipboard_29190-4660.jpg?w=2000"
    }
});

module.exports = mongoose.model('doctors', doctorSchema);