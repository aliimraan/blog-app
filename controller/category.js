const express=require('express')
const router=express.Router()
const categoryModel=require('../model/category')

router.get('/',(req,res)=>{
    categoryModel.find().then(data=>{
        res.status(200).json({data,"msg":"getting category"})
    }).catch(err=>{
        res.status(400).json({err,"msg":"not getting category"})

    })
})


router.post('/add',(req,res)=>{
    const {c_name}=req.body;
    const newCategoryModel=new categoryModel({c_name})
    newCategoryModel.save().then(data=>{
     
        res.status(200).json({data,"msg":"category added"})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({err,"msg":"category not added"})
    })

})

module.exports=router;