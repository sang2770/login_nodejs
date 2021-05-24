const express       =require("express");
const morgan        =require("morgan");
const app           =express();
const port          =3000;
const handlebars    =require("express-handlebars");
const path          =require("path");
const router        =require("./Router/index")
const db            =require("./config/mongodb/index");

const session       = require("express-session")
const cookieSession = require("cookie-session");
const User          =  require("./App/Model/user");

// handlerbars
app.engine("hbs", handlebars({
    extname:".hbs",
}))
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "Views"));


// morgan
app.use(morgan('combined'));
// middleware
app.use(express.urlencoded({
  extended:true
}));  // với html
app.use(express.json()); // với js
// cookie session
app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);
// passport.use(
//     'local',
//     new LocalStrategy(function(username, password, done) {
//         User.findOne({ username: username }, function(err, user) {
//             if (err) {
//                 return done(err);
//             }
//             if (!user) {
//                 return done(null, false);
//             }
//             if (user.password != password) {
//                 return done(null, false);
//             }
//             return done(null, user);
//         });
//     })
// );

// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


//connect database
db.connect();
// Router
router(app);


app.listen(port, ()=>{
    console.log(`App is listening at  http://localhost:${port}` )
})


