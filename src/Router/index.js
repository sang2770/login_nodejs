const auRouter        =require("./Authetication");
const homeRouter        =require("./Home");
const {Authenticated}= require("../App/utils/index");
module.exports=function router(app)
{
    app.use("/user", auRouter);
    app.use("/",Authenticated, homeRouter);
}