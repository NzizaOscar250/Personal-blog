import express from "express";
import {fetchUsers,fetchUser,createUser,login} from "../controllers/userController.js"
import Auth from "../middleware/auth.js";

const route=express.Router()

route.get("/",fetchUsers);
route.get("/:id",fetchUser);
route.post("/signup",createUser);
route.post("/login",login)



export default route; 