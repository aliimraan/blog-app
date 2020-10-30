const mongoose=require('mongoose')

const postsSchema=new mongoose.Schema({
    p_title:{type:String},
    p_body:{type:String},
    p_coverImage:{type:String},
    author_id:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    p_created_at:{type:Date,default:Date.now()},
    c_name:{type:mongoose.Schema.Types.ObjectId,ref:'category'},
})

const postsModel=mongoose.model('posts',postsSchema)

module.exports=postsModel;