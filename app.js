
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
// const fileUpload = require("express-fileupload")
const path = require("path")
require('dotenv').config();


//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false, limit: "10mb"}))
app.use(bodyParser.json({limit: "10mb"}))
app.use(cors())


//Connect MongoDB
const mongoURL = process.env.DATABASE_URL
mongoose.connect( mongoURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
 const db = mongoose.connection;
 db.on("open", () => console.log("Connected to DB"));
 db.on("error", error => console.log("Error"));


//Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);


//Listen 
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})