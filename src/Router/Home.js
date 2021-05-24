const express       =require("express");
const router        =express.Router();

const homeController=require("../App/Controllers/homeControllers");

router.get("/",  homeController.show);
module.exports=router;