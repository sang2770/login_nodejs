const express       =require("express");
const router        =express.Router();
const userController=require("../App/Controllers/userControllers");
const {Authenticated}= require("../App/utils/index");
router.get("/login", userController.showLogin);
router.get("/register", userController.showRegister);
router.get("/inf", userController.showInf);
router.get("/logout",Authenticated, userController.logout);
router.post("/login", userController.login );
router.post("/register", userController.register);


module.exports=router;