const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        trim: true,
        required: true,
        unique: true,
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
        required: true
    },
    
},{
    timestamps: true
})


module.exports = mongoose.model("User", userSchema)