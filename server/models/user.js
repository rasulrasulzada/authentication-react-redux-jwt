const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

//Define user model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
})

//encrypt password
userSchema.pre("save", function(next) {
    const user = this;
    
    bcrypt.genSalt(10, function(err, salt){
        if (err) next(err)

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) next(err)

            user.password = hash
            next();
        })
    })
})

//Password compare method
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) callback(err);

        callback(null, isMatch);
    })
}

//Create the model class
const ModelClass = mongoose.model("user", userSchema)

//Export the model
module.exports = ModelClass;