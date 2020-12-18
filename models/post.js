const mongoose = require("mongoose")


//you are to provide the necessary field type
const postSchema = mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    user_id:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },   
},{
    timestamps: true
})


module.exports = mongoose.model("Post", postSchema)