const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const { response } = require("express");
// const { Validator } = require('node-input-validator')
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken")
const webtoken = require("../middleware/auth")
const User = require("../models/user")


//Error formatter. You can plug this function to help you format Validation error messages.
// // It is not necessary for now
// const VerrorsMessageFormatter = (Verrors) => {       //formats verror message
//     let errors = Object.entries(Verrors)
//     errorsFormatted = errors.map(h => h[1].message)
//     return errorsFormatted
// }


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
//Signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if(password.length < 8) 
        return res.status(400).json({ msg: 'Password must be at least 8 characters'});
    
        const existingUser = await User.findOne({ email: email });
        if(existingUser) 
        return res.status(400).json({ msg: 'User already exists.'});
        if(username) return username = email;
    
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
            username
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);  
        }
        catch(err) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
});


//Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
  
        if(!email || !password) 
        return res.status(400).json({ msg: 'Please enter required fields.' });
  
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({ msg: 'Account does not exist, Please Register.' });
  
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ msg: 'Please enter the correct password for this account.' });
  
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ 
          token,
          user: {
              id: user._id,
              name: user.name
          }
        });
      }
      catch(error) {
         res.status(500).json({ error: error.message })
      }
});


//View Details
router.get('/:userid', webtoken.verifyToken, async (req, res) => {
    try {
      const userDetails = await User.findById({_id: req.params.userid});
      res.send(userDetails);
    }
    catch(error) {
     res.status(500).json({ error: error.message })
    }
});


//Delete Details
router.delete('/:userid', webtoken.verifyToken, async (req, res) => {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.userid })
      res.send(user);
    }
    catch(error) {
      res.status(500).json({ error: error.message })
    }
});


module.exports = router;