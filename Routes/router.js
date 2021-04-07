const express=require("express");
const UserController=require("../Controller/controller");
const Auth=require("../Auth/auth");

const router=express.Router();

router.get("/", Auth, UserController.GetUser)

router.post("/signup",UserController.CreateUser);

router.post("/login",UserController.LoginUser);

router.post("/delete",UserController.DeleteUser)

module.exports=router;