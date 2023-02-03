import data from "../data.js"
import bcrypt from "bcrypt";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const secret=process.env.ACCESS_TOKEN_SECRET;

export const fetchUsers=async(req,res)=>{
       const users=await User.find();
    res.status(200).json(users); 
}

export const fetchUser=(req,res)=>{
    const {id}=req.params
    const user=data.filter((item,i)=>item.id === id);

    res.status(200).json(user);
}

export const createUser=async(req,res)=>{
   
    const {fname,lname,email,password,confirm}=req.body;
 
    try{
        const userExist= await User.findOne({email});
        if(userExist) return res.status(400).json({message:'Email already exists!! login please'})
        if(password !== confirm ) return res.status(400).json({message:'Password Doesnt match'});
        const hashed= await bcrypt.hash(password,10);
        const result =await User.create({
            username:{fname,lname},
            password:hashed,
            email
        });
        const token=jwt.sign({email:result.email,id:result._id},secret,{expiresIn:'24h'});
        res.status(200).json({result,token});
    }catch(e){
  res.status(400).json(e)
    }
}




export const login=async(req,res)=>{
   const {email,password}=req.body;
   try{

//   const token= await bcrypt.genSalt(10);



         const userExist=await User.findOne({email});
         if(!userExist) return res.status(404).json({message:'Email not found'});
         const isPassCorrect=await bcrypt.compare(password,userExist.password);
         if(!isPassCorrect) return res.status(400).json({message:'Incorrect Password'});
          const token=jwt.sign({email:userExist.email,id:userExist._id},secret,{expiresIn:'24h'});
          res.status(200).json({accessToken:token});
   }
   catch(e){
    console.log(e)
   }
}



const createProfile=async(req,res)=>{
    const {photo}=req.body;

    try{

    }
    catch(e){
        console.log(e)
    }
}

