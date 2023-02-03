import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const Auth = async(req,res,next)=>{
    let decodedData;
try{
    const authHeader=req.headers.authorization;
   const token=authHeader && authHeader.split(' ')[1];
   if (token === null) return res.status(403);
    
   
   if (token){
    decodedData=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   
//     //    decodedData=jwt.decode(token);
//     //    console.log(decodedData);
    
   }
   
}
catch(e){
    console.log(e)
}
console.log(decodedData);
req.userId=decodedData?.id;
next();
}

export default Auth