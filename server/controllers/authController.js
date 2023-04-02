import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//User Authentification
export const registerUser = async (req, res) => {
  //try to get the data from the front end body
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      pic,
      friends,
      location,
      occupation,
    } = req.body;

    //password encryption
    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);

    //if no errors so far:
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hasedPassword,
      pic,
      friends,
      location,
      occupation,
      impressions: 0,
    });

    const savedUser = await newUser.save(); //save user if no errors
    res.status(201).json(savedUser); //code 201 = saved succesfully
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//User Login
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } else {
      return res.status(400).json({ msg: "Invalid Email or Password." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
