const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { response } = require("express");
//const { Validator } = require('node-input-validator')
const jwt = require("jsonwebtoken")
const webtoken = require("../middleware/auth")
const Post = require("../models/post")


//Error formatter. You can plug this function to help you format Validation error messages.
// It is not necessary for now
const VerrorsMessageFormatter = (Verrors) => {       //formats verror message
    let errors = Object.entries(Verrors)
    errorsFormatted = errors.map(h => h[1].message)
    return errorsFormatted
}

// //sample end point
// router.get("/sample/test", async(req, res)=>{
//     try {
//         res.send("i am a test endpoint")
//     } catch (error) {
//         console.log(error);
//         res.send(error)
//     }
// })

//router.post("/", webtoken.verifyToken, async (req, res, next)=>{}). This is how you add a middleware. In this case the middleware is 
//called  webtoken.VerifyToken. 

//start your code from here

//Create Posts
router.post('/', webtoken.verifyToken, async (req, res) => {
    try {

    req.body.user_id = req.user._id
    const newPost = new Post(req.body)
    await newPost.save()
    // console.log(req.user)
    res.send(newPost)
    }
    catch(error) {
      res.status(500).json({ error: error.message });
    }
});


//Get All Posts
router.get('/', webtoken.verifyToken, async (req, res) => {
    try {
     const posts = await Post.find({user_id: req.user._id}).populate("user_id");
     res.json(posts);
    }
    catch(error) {
     res.status(500).json({ error: error.message });
    }
});


//Get a specific Post
router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findOne({_id: req.params.id}).populate("user_id");
      res.send(post);
    }
    catch(error) {
        console.log(err);
        res.status(400).send("something went wrong")
    }
});


//Update a Post
router.put('/:id', async (req, res) => {
    try {
      const { title } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        {_id: req.params.id }, 
        {$set: {title}}
        );
      res.send(updatedPost);
    }
    catch(error) {
     res.status(500).json({ error: error.message });  
    }
});


//Delete a post
router.delete('/:id', async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete({ _id: req.params.id });
      res.send(deletedPost);
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;