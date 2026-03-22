import User from "../models/user.model.js";

// GET CURRENT USER
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `current user error ${error}` });
  }
};

// GET OTHER USERS
export const getOtherUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId } // exclude current user
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `get other users error ${error}` });
  }
};