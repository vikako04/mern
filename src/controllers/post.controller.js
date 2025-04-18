import Post from '../models/Post.model.js'
import ApiError from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'

export const createPost = asyncHandler(async (req, res) => {
  const post = await Post.create({ 
    content: req.body.content, author: req.user._id });
    res.status(201).json(post);
});


export const getAllPosts = asyncHandler(async(req, res) => {
    const posts = await Post.find().populate('author', 'username email').populate('likes', 'username email');
    res.json(posts)
});

export const getMyPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({author: req.user._id});
    res.json(posts)
});

export const updatePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post) throw new ApiError(404, 'Post not found');
    if(!post.author.equals(req.user._id)) throw new ApiError(403, 'Forbidden');

    post.content = req.body.content;
    post.updatedAt = new Date();
    await post.save();
    res.json(post)
})

export const deletePost = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post) throw new ApiError(404, 'Post not found');
    if(!post.author.equals(req.user._id)) throw new ApiError(403, 'Forbidden');

    await post.deleteOne();
    res.json({message: 'Post deleted'})
})

export const toggleLike = asyncHandler(async(req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) throw new ApiError(404, 'Post not found');

    const index = post.likes.indexOf(req.user._id);
    if (index === -1) {
        post.likes.push(req.user._id)
    } else {
        post.likes.splice(index, 1)
    }

    await post.save();
    res.json(post)
})
