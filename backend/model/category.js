const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    c_name:{type:String}
})
const categoryModel=mongoose.model('category',categorySchema)

module.exports=categoryModel;