import mongoose from 'mongoose'


const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    refreshToken: String,
  },
  {
    timestamps: true,
  }
)




const Post = mongoose.model('Post', postSchema)
export default Post
