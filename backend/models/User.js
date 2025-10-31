const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName:{type:String,required:true},
        email:{type:String,required:true},
        phone:String,
        nid:String,
        password:{type: String,required:true},
        role:{type:String, default:'user'},
        balance:{type:Number,default:50},
        userId:{type:String,unique:true}
    } , {timestamps:true}
);

module.exports = mongoose.model('User',userSchema);