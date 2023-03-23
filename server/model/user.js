const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    }
});

module.exports = mongoose.model('users', userSchema);