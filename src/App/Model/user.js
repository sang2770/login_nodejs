const mongoose                  =require("mongoose");
const Schema                    =mongoose.Schema;
const passportLocalMongoose     =require("passport-local-mongoose");

const user=new Schema({
    username:{type:String},
    password:{type:String},
    phone:{type:String},
    address:{type:String}
})

user.plugin(passportLocalMongoose);
module.exports=mongoose.model("user", user);