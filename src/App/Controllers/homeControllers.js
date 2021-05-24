const user= require("../Model/user");
class homeControllers{
    // [GET] /
    show(req, res, next)
    {
        // user.fin
        res.render("home", {user:req.session.user});
    }
}

module.exports=new homeControllers;