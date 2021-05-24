const passport              =  require("passport");
const User                  =  require("../Model/user");
const bcrypt        = require("bcrypt");
class userControllers{

    // [GET] /user/login
    showLogin(req, res, next){
        const response={
            title: "Login",
		    error: req.query.error
        }
        console.log(response.error)
        res.render("Login", response);
    }

    // [GET] /user/resgister
    showRegister(req, res, next){
        res.render("Resgister");
    }

    // [GET] /user/inf
    showInf(req, res, next){
        res.render("Inf");
    }
    //[POST] /register/pass
    async register(req, res, next)
    {
        // // res.json(req.body);
        // req.checkBody('username', 'Name is required').notEmpty();
        // User.register(new User({username: req.body.username, password:req.body.password,phone:req.body.phone,address: req.body.address}),req.body.password,function(err,user){
        //     if(err){
        //         console.log(err);
        //         res.render("Resgister", {err:"Empty"});
        //     }
        // passport.authenticate("local")(req,res,function(){
        //     res.redirect("/user/login");
        // })    
        // })
        const { username, password , phone, adđress} = req.body;

        // check for missing filds
        if (!username || !password) {
        res.send("Please enter all the fields");
        return;
        }

        const doesUserExitsAlreay = await User.findOne({ username });

        if (doesUserExitsAlreay) {
        res.send("A user with that email already exits please try another one!");
        return;
        }

        // lets hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        const latestUser = new User({ username, password: hashedPassword,phone, adđress });

        latestUser
        .save()
        .then(() => {
            res.send("registered account!");
            return;
        })
        .catch((err) => console.log(err));
        
    }
    //[POST] /user/login
    async login(req, res, next)
    {
        const { username, password } = req.body;

        // check for missing filds
        if (!username || !password) {
        res.send("Please enter all the fields");
        return;
        }

        const doesUserExits = await User.findOne({ username });

        if (!doesUserExits) {
        res.send("invalid username or password");
        return;
        }

        const doesPasswordMatch = await bcrypt.compare(
        password,
        doesUserExits.password
        );

        if (!doesPasswordMatch) {
        res.send("invalid useranme or password");
        return;
        }

        // else he\s logged in
        req.session.user = {
            username,
        };

        res.redirect("/");
    }
    //[GET] /user/logout
    logout(req, res, next)
    {
        req.logout();
        res.redirect("/");
    }


}

module.exports=new userControllers;