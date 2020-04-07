const mongoose = require("mongoose")
const mongoURI = "mongodb+srv://rasul:1234@cluster1-rddjp.mongodb.net/react-auth?retryWrites=true&w=majority";

const connectDatabase = () => {
    mongoose.connect(mongoURI, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
 })
    .then(() => {
        console.log("MongoDb Connection Successful")
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = connectDatabase