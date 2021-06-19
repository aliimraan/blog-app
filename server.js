const express=require('express');
const mongoose=require('mongoose');
const multer =require('multer')
const app=express();
const bodyparser=require('body-parser')
const cors=require('cors')
const usersController=require('./controller/users')
const postsController=require('./controller/posts')
const categoryController=require('./controller/category')
require('dotenv').config();
const URL=process.env.DB_CONNECTION;

mongoose.connect(URL,{ 
     useNewUrlParser: true,
     useUnifiedTopology: true })
 .then(()=>console.log('db connected'))
 .catch(err=>console.log('not connected'+err))

 


app.get('/',(req,res)=>{
    res.send('hello from node js')
})

app.use('/public',express.static('public'))
app.use(bodyparser.json())
app.use(cors())
app.use('/users',usersController);
app.use('/posts',postsController);
app.use('/category',categoryController);

const PORT=process.env.PORT||5000

if(process.env.NODE_ENV="production"){
    app.use(express.static('client/build'))
}

app.listen(PORT,()=>{
    console.log('server started')
})