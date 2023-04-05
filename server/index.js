const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser');
const server = require("http").createServer(app);
const route = require("./src/routes/routes.js")
// daatabase 
const connectToDatabase = require("./src/config/db")
const {connection, client} = require("./src/config/redisConnect")
connectToDatabase()
connection()
// middlewares
app.use(express.json())
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(route)

app.get("/" , (req , res)=>{
    res.status(200).send("<h1>har har mahadev</h1>")
    // client
})


server.listen(port ,()=>{
    console.log(`connected to http://localhost:${port} 🚀`);
})