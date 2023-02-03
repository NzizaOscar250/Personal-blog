import mongoose from "mongoose"
const User=mongoose.model("users",new mongoose.Schema({
    username:{
        fname:String,
        lname:String,
    },
    password:{type:String,require:true},
    email:String,
    photo:[{type:String,require:true,default:'avatar.png'}],
    bio:[{
        type:String,
        require:false,
        hobbies:[{type:String}],

    },{timestamps:true}]
},{timestamps:true}));



export default User