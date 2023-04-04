const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    departmentName:{
        type:String,
        require:true
    },
    departmentDiscription:{
        type:String,
        require:true
    },
    departmentImage:{
        type:String,
        require:true
    },
    show:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('department', departmentSchema);