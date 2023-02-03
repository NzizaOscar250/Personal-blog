import Article from "../models/Posts.js";
import User from "../models/users.js";
import mongoose from "mongoose";



export const fetchPosts=async(req,res)=>{
    try{
          const data=await  Article.find();
           res.status(200).json(data);
    }
    catch(e){
        res.status(500).json({message:'Slow Internet Connection',Erro:e})
    }
}


export const createPost = async(req,res)=>{
    const  owner=req.userId;
    if(!mongoose.Types.ObjectId.isValid(owner)) res.status(400).json({message:"Not Authenticated"});

    const {body,title,image}=req.body;
try{
 
    const result=await Article.create({owner,body,image,title});
    res.status(200).json({message:'Post successfully Created !',data:result});

}catch(e){
res.status(404).json({message:"Unable to create article",error:e});
}

}



export const updatePost=async(req,res)=>{
    const {id}=req.params;
     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:'Invalid post'});

    try{
        

    }
    catch(e){
            res.status(404).json({message:"unable to update article",error:e});
    }
}


export const likePost=async(req,res)=>{
    const {id}=req.params;  //?the article
    
    const liker=req.userId; //!the guy who is liking the post
    
    if(!mongoose.Types.ObjectId.isValid(id)) return  res.status(404).json({message:"Post you are trying doesn't exist!"});
    

    try{
    const article=await Article.findById(id);   //!find an article
    const likedBy=await User.findById(liker) //!who is liking this Article
    //find if post is already liked by this use then dislike it

  const It_is_already_liked=article.likes.likedBy.findIndex((id)=>id == String(liker));

 if(It_is_already_liked == -1){
    //like
        article.likes.likedBy.push(liker)
 }
 else{

    article.likes.likedBy=article.likes.likedBy.filter((id)=> id !== String(liker));
 }
  const updated= await Article.findByIdAndUpdate(id,article,{new: true});

    res.status(200).json(updated);
   }
   catch(e){
    console.log(e)
    res.status(400).json({message: 'Unable to like this Article',error:e});
   }
}       




//Delete posts


export const deletePosts=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(405).json({message:"Post Not found"});
    const deletePost=await Article.findByIdAndRemove(id);
    res.status(200).json({message:"Post has Been Deleted",data:deletePost});
}

// comment posts


export const commentPost=async(req,res)=>{
    const {id}=req.params;
    const {comment}=req.body;
     console.log(req.userId);

     
    if(!mongoose.Types.ObjectId.isValid(req.userId)) res.status(405).json({message:'Login please'});
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(405).json({mesage:"Post doen't exists"});

        const post = await Article.findById(id);
        const { username:{fname,lname}}=await User.findById(req.userId);
        post.comments.push({commentBody:comment,commentedBy:`${fname} ${lname}`,date:new Date()})
       const savedComment= await Article.findByIdAndUpdate(id,post,{new:true});

    res.status(200).json(savedComment);

}


export const likeComment=async(req,res)=>{
    const {postId,commentId}=req.params;

    if(!mongoose.Types.ObjectId.isValid(req.userId)) res.status(405).json({message:'Login please'});
    if(!mongoose.Types.ObjectId.isValid(postId)) res.status(405).json({mesage:"Post doen't exists"});
    if(!mongoose.Types.ObjectId.isValid(commentId)) res.status(405).json({mesage:"comment doen't exists"});

    const post =await Article.findById(postId);
    //find post with the same comment
    const findComment=post.comments.filter((data)=>data._id == commentId)
    const updated = await Article.where()
    res.status(200).json(findComment);


}
