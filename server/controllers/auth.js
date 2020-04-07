const User = require("../models/user")
const jwt = require("jwt-simple");
const config = require("../config")

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp}, config.secret)
}

const signin = (req, res, next) => {
    //User has already had their email and password auth'd
    //We just need to give them a token
    res.send({token: tokenForUser(req.user)});
}

const signup = (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(422).send({error: "You must provide email and password"});
    }
    //See if a user with given email exits

    User.findOne({email: email}, (err, existignUser) => {
        if(err) next(err);

        //If a user with this email does exits, return a error
        if(existignUser) {
            return res.status(422).send({error: "This email is in use"});
        }

        //If a user with this email does NOT exits, create and save new user record
        const user = new User({
            email,
            password
        })
        user.save(err => {
            if(err) next(err);
                 //Respond to request indicating the user was created
                
             res.json({
                success: true,
                token: tokenForUser(user)
            })

           
        });
    })

}

module.exports = {
    signin,
    signup
}