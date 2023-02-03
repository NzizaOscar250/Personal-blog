import mongoose from "mongoose";


const Article=mongoose.model("Article",new mongoose.Schema({
    owner:{type:String,require:true},
    body:{type:String,require:true},
    image:{type:String,require:true},
    title:{type:String,require:true},
    likes:{
        likedBy:{
            type:[String],
             require:true
            }
        
    },
    comments:[{
        commentBody:{type:String,required:true},
        commentedBy:{type:String,required:true},
        date:{type:Date,required:true},
        likes:{type:[String],required:true}
    }]

},{timestamps:true}));


export default Article;

