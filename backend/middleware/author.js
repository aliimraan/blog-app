const jwt=require('jsonwebtoken');

function authen(req,res,next){
    const token=req.header('x-auth-token');
    console.log(token)
    if(!token) return res.status(401).json({msg:'login first'})

    try{
        
    const decode=jwt.verify(token,'blog_jwtsecret')
    req.user=decode
    next();

    }
    catch(err){
        res.status(400).json({msg:'token not valid'})
        
    }
}
module.exports=authen