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
        const { username, password , phone, address} = req.body;

        // check for missing filds
        if (!username || !password) {
        // res.send("Please enter all the fields");
        res.render("Resgister", {error:true})
        return;
        }

        const doesUserExitsAlreay = await User.findOne({ username });

        if (doesUserExitsAlreay) {
        // res.send("A user with that email already exits please try another one!");
        res.render("Resgister", {exists:true})
        return;
        }

        // lets hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        const latestUser = new User({ username, password: hashedPassword,phone, address });

        latestUser
        .save()
        .then(() => {
            // res.send("registered account!");
            res.render("Login");
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
        res.redirect("back")
        return;
        }

        const doesUserExits = await User.findOne({ username });

        if (!doesUserExits) {
        // res.send("invalid username or password");
        res.render("Login",{error:MediaStreamTrackAudioSourceNode})
        return;
        }

        const doesPasswordMatch = await bcrypt.compare(
        password,
        doesUserExits.password
        );

        if (!doesPasswordMatch) {
        // res.send("invalid useranme or password");
        res.render("Login",{error:true})
        return;
        }
        const phone=doesUserExits.phone;
        const address= doesUserExits.address;
        // else he\s logged in
        req.session.user = {
            username,
            phone,
            address
        };

        res.redirect("/");
    }
    //[GET] /user/logout
    logout(req, res, next)
    {
        req.logout();
        req.session.user=null;
        res.redirect("/");
    }


}

module.exports=new userControllers;