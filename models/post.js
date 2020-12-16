const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    user_id: {
       type: String   
    },   
},{
    timestamps: true
});


module.exports = mongoose.model("Post", postSchema)