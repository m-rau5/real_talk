import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser); //get the id of the user
router.get(":/:id/friends", verifyToken, getUserFriends); //get user friends

router.patch("/:id/:friendId", verifyToken, addRemoveFriends); //update request for add/remove friends

export default router;
