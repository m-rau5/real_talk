import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { createPost } from "./controllers/postController.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/userModel.js";
import Post from "./models/postModel.js";
import { users, posts } from "./data/index.js";

//Configuration for middleware and modules
const __filename = fileURLToPath(import.meta.url); //to grab file url for modules
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());

app.use(helmet()); //request safety
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); //login component
app.use(bodyParser.json({ limit: "30mb", extended: true })); //for processing body
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); //cross-origin requests

//asset directory (localy in this project)
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//Local file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//Post routes with files
app.post("/auth/register", upload.single("picture"), authRoutes);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
/* TRY TO MOVE POSTS TO ROUTES */

//User Routes Set-up
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//Mongoose db/server setup
mongoose.set("strictQuery", false); //compatability with future version (v7)
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}.`));
    //Add dummy data -> only do once
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log.error(`${error} - cannot connect to db`));
