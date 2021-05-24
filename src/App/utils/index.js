module.exports={
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/user/login');
    }, 
    isLoggedOut(req, res, next) {
        if (!req.isAuthenticated()) return next();
        res.redirect('/');
    },
    Authenticated(req, res, next){
        if (!req.session.user) {
          res.send("You're not allowed to view this content! please log in first!");
          return;
        }
        //else continue
        next();
    }
}