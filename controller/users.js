const express=require('express')
const mongoose=require('mongoose')
const router=express.Router();
const multer=require('multer')
const bycrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const author=require('../middleware/author')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload=multer({storage:storage})

const usersTable=require('../model/users');

router.get('/:id',(req,res)=>{
    const id=req.params.id;
    usersTable.findById({_id:id})
    .then(data=>{
       
        res.status(200).json({data,msg:'all users',data})
    }).catch(err=>{
        res.status(400).json({msg:'err',err})
    })
})

router.post('/register',upload.single('pp'),(req,res)=>{
   const {name,email,password,phno,intro}=req.body
   const pp=req.file.filename;

    const newUsersTable= new usersTable({name,email,password,phno,intro,pp})

    //hashing the password
   bycrypt.genSalt(10,(err,salt)=>{
    bycrypt.hash(newUsersTable.password,salt,(err,hash)=>{
        if(err) throw err

        //saving the data in db
        newUsersTable.password=hash;
        newUsersTable.save()
        .then(data=>{
          //create a jwt token 
          jwt.sign({id:data.id},'blog_jwtsecret',(err,token)=>{
              if(err) throw erasar
           
          })
            


        }).catch(err=>console.log('insertion failed'+err))
     })
     
    })
})

router.post('/login',(req,res)=>{
    const{email,password}=req.body;
    
    usersTable.findOne({email})
    .then(data=>{
        if(!data) throw  res.status(400).json({msg:"email not matched"})
        else{
        bycrypt.compare(req.body.password,data.password,(err,record)=>{
            if(err) throw err
            if (record){
               //create jwt token and send message
                jwt.sign({id:data.id},'blog_jwtsecret',(err,token)=>{
                    if(err) throw err
                return res.status(200).json({token,data,"msg":'you are logged in'})
                })

            }else{
                
             
              return res.status(400).json({"msg":'invalid credentials'})
            }
        })
       
    }
    }).catch(err=>console.log(err))

})

router.put('/updateUser/:id',upload.single('pp'),(req,res)=>{
    const id=req.params.id;
    const {name,email,phno,intro}=req.body;
    const pp=req.file.filename;
    usersTable.findByIdAndUpdate(id,{name,email,phno,intro,pp})
    .then(data=>{
        res.status(200).json({data,"msg":"account updated successfully"})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({err,"msg":"oops!! try again"})
    })
})

router.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id
    usersTable.findByIdAndDelete(id)
    .then(data=>{
        res.status(200).json({data,"msg":"account deleted"})
    }).catch(err=>{
        res.status(400).json({err,"msg":"oops!! error while deleting account "})
    })
})
module.exports=router;