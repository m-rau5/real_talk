import Post from "../models/postModel.js";
import User from "../models/userModel.js";
//Create new post

export const createPost = async (req, res) => {
  try {
    const { userId, description, pic } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPic: user.pic,
      pic,
      likes: {},
      comments: [],
    });

    await newPost.save(); //save the current post
    const post = await Post.find(); //grab all the post, including the new one
    res.status(201).json(post);
  } catch (err) {
    res.staus(409).json({ message: err.message });
  }
};

//get existing posts
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find(); //grab all the post, including the new one
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

//update posts
export const likePost = async (req, res) => {
  try {
    const { userId } = req.body; //from the body of the request
    const { id } = req.params; //from the query string
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId); //check if user is in the likes map

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
