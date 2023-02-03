import express from "express";
import bodyParser from "body-parser"
import route from "./routers/userRouter.js"
import cors from "cors"
import mongoose from "mongoose";
import postRoutes from "./routers/postRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app=express();
const PORT=8000;
const url="mongodb://127.0.0.1/BLOG";

app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
app.use('/users',route);
app.use('/posts',postRoutes);

mongoose.connect(url).then(
    app.listen(PORT,()=>{
        console.log(`sever running: http://127.0.0.1:${PORT}`);
    })
)
.catch((e)=>console.log(e))