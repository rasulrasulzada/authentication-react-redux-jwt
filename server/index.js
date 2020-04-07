//Main starting point of the application
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const router = require("./router");
const connectDatabase = require("./helpers/database/connectDatabase")
const cors = require('cors');


//DB Setup
connectDatabase();


//App Setup
app.use(morgan("combined"));
app.use(bodyParser.json({type: "*/*"}));
app.use(cors());//this handle "CORS" errors in client side
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on: ${port}`)