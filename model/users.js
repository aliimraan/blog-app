const mongoose =require('mongoose');
const usersSchema= new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    phno:{type:Number},
    intro:{type:String},
    pp:{type:String},
    intro:{type:String},
    registered_at:{type:Date,default:Date.now()},
})
const usersTable=mongoose.model('users',usersSchema);
module.exports=usersTable;