const mongoose = require("mongoose")


//you are to provide the necessary field type
const postSchema = mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    user_id: {
        type: String,  
    },   
},{
    timestamps: true
})


module.exports = mongoose.model("Post", postSchema)