const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user");
const config = require("../config")
const LocalStragtegy = require('passport-local');

//Setup for local login
const localOptions = {usernameField: "email"};
const localLogin = new LocalStragtegy(localOptions, (email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if(err) done(err, false);     
        if(!user) done(null, false);

      
        //compare passwords- is 'password' equal to user.password?
        user.comparePassword(password, (err, isMatch) => {
            if(err) done(err);
            if(!isMatch) done(null, false);

            return done(null, user)
        })
    })
})

//Setup Options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    //See if the user ID in the payload exists in the database
    User.findById(payload.sub, (err ,user) => {
        if (err) done(err, false)//can't search

        if (user) done(null, user)//searched and found user
        else done(null, false)//searched but did't find user
    })
})


//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);