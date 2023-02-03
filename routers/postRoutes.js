import express from "express";
import Auth from "../middleware/auth.js";
import {createPost,updatePost,fetchPosts,likePost,deletePosts, commentPost, likeComment} from "../controllers/postController.js";
const postRoutes=express.Router();

postRoutes.post("/",Auth,createPost);
postRoutes.post("/update/:id",updatePost)
postRoutes.get("/",fetchPosts);

postRoutes.patch("/like/:id",Auth,likePost)
postRoutes.delete("/delete/:id",deletePosts);
postRoutes.patch("/comment/:id",Auth,commentPost);

postRoutes.patch("/comment/:postId/like/:commentId",Auth,likeComment);
export default postRoutes;
