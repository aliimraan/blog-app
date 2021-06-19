const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()
const author=require('../middleware/author')
const multer=require('multer')
const postsModel=require('../model/posts')
const usersModel=require('../model/users')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload=multer({storage:storage})

router.post('/add',author,upload.single('p_coverImage'),(req,res)=>{
    
    const {p_title,p_body,author_id,c_name}=req.body;
    const p_coverImage=req.file.filename;
    
    const newpostsModel= new postsModel({
        p_title,p_body,p_coverImage,author_id,c_name
    })

    newpostsModel.save().then(data=>{
     
        res.status(200).json({data,msg:'posted successfully'})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({err,
        msg:'posting fail..try agin'})
    })
})

router.get('/personalPosts/:id',author,(req,res)=>{
    const s_id=req.params.id
    postsModel.find({author_id:s_id})
    .then(data=>{
       res.status(200).json({data,msg:'got the data'})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({err,msg:'not got the data'}) 
    })
})

router.get('/allPosts',author,async (req,res)=>{
    await postsModel.find().populate("author_id").populate('c_name')
    .then(data=>{ 
        console.log("all post are"+data)
        res.status(200).json({data,'msg':'all posts colleced'})
    }).catch(err=>{
       console.log("all post are"+err)
        res.status(400).json({err,'msg':'all posts not colleced'})
    
    })

})
router.get('/recentPosts',author,async (req,res)=>{
    await postsModel.find().populate("author_id").populate('c_name').limit(3).sort({p_created_at:-1})
    .then(data=>{ 
        console.log("all post are"+data)
        res.status(200).json({data,'msg':'all posts colleced'})
    }).catch(err=>{
       console.log("all post are"+err)
        res.status(400).json({err,'msg':'all posts not colleced'})
    
    })

})
router.get('readposts/:id',(req,res)=>{
    const id=req.params.id;
    postsModel.find({c_name:id}).then(data=>{
        res.status(200).json({data,"msg":"post with catname"})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({err,"msg":"not getting post with catname"})
    })
})

router.get('/singlepost/:id',author,(req,res)=>{
    const id=req.params.id
    postsModel.find({_id:id}).populate('c_name').then(data=>{
        console.log(data)
        res.status(200).json({data,"msg":"single post"})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({err,"msg":"single post"})
    })
})
router.put('/updateSinglePost/:id',upload.single('p_coverImage'),(req,res)=>{
    const id=req.params.id
    const {p_title,p_body,c_name}=req.body
    const p_coverImage=req.file.filename
    postsModel.findByIdAndUpdate(id,{p_title,p_body,c_name,p_coverImage})
    .then(data=>{
        console.log(data)
        res.status(200).json({data,"msg":"post updated"})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({err,"msg":"post not updated"})
    })
})
router.delete('/deletePersonalPost/:id',(req,res)=>{
    const id=req.params.id
    postsModel.findByIdAndDelete(id)
    .then(data=>{
        res.status(200).json({data,"msg":"post deleted"})
    }).catch(err=>{
        res.status(400).json({err,"msg":"post not deleted"})
    })
})

module.exports=router;