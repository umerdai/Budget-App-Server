import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/Users.js"; 

dotenv.config();

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in MongoDB
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Directly compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(400).send("Password not valid");
    }

    // Create a JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("User ID:", user._id);
    console.log("Username:", user.username);
    res.json({ token, user: { id: user._id, username: user.username } });

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal server error");
  }
};

export const forgotpassword = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Find the user in MongoDB
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(400).send("User not found");
    }

    // Generate a new password
    const newPassword = Math.random().toString(36).slice(-8);
    console.log("New password:", newPassword);

    // Update the user's password in the database
    user.password = newPassword;
    await user.save();
    console.log("Password updated");
    res.send({ message: "New password sent to your email", newPassword });
  } catch (err) {
    console.error("Error during forgot password:", err);
    res.status(500).send("Internal server error");
  }
};

export const getUser = (req, res) => {
  res.json({ username: req.username });
};
