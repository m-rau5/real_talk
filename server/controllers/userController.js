import User from "../models/userModel.js";

//get current logged in user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friendsList = await Promise.all(
      user.friendsList.map((id) => User.findById(id))
    );
    const formattedFriends = friendsList.map(
      ({ _id, firstName, lastName, occupation, location, pic }) => {
        return { _id, firstName, lastName, occupation, location, pic };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friendsList.includes(friendId)) {
      console.log(
        `${user.firstName} is not longer friends with ${friend.firstName}.`
      );
      user.friendsList = user.friendsList.filter((id) => id !== friendId);
      friend.friendsList = friend.friendsList.filter((id) => id !== id);
    } else {
      console.log(`${user.firstName} is now friends with ${friend.firstName}.`);
      user.friendsList.push(friendId);
      friend.friendsList.push(id);
    }
    await user.save();
    await friend.save();

    const friendsList = await Promise.all(
      user.friendsList.map((id) => User.findById(id))
    );
    const formattedFriends = friendsList.map(
      ({ _id, firstName, lastName, occupation, location, pic }) => {
        return { _id, firstName, lastName, occupation, location, pic };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
