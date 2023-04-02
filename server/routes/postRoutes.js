import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

//get pages
router.get("/", verifyToken, getFeedPosts); //get the home page
router.get("/:userId/posts", verifyToken, getUserPosts);

//update pages
router.patch("/:id/like", verifyToken, likePost);

export default router;
