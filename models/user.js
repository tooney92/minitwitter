const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8
    }
    
},{
    timestamps: true
})

//added stuff here
module.exports = mongoose.model("User", userSchema)