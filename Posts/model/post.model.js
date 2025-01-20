import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user_id:{
        type : String,
        required : true
    },
    title:{
        type : String,
        required : true
    },
    content:{
        type : String,
        required : true
    },
    created_at:{
        type : Date,
        default : Date.now()
    },
    updated_at: {
        type : Date,
        default : Date.now()
    }
})

const Post = mongoose.model('post', postSchema)

export default Post;