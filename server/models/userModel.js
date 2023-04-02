import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, unique: true, required: true, max: 50 },
    password: { type: String, required: true, min: 5 },
    pic: {
      type: "String",
      default: "",
      //"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    friendsList: { type: Array, default: [] },
    location: { type: String },
    occupation: { type: String },
    impressions: Number,
  },
  { timestaps: true }
);

//moved password encryption to Controller

//password check
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
// module.exports = User;
export default User;
