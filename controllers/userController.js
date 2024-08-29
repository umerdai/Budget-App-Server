import User from "../model/Users.js"; // Import the User model

// Function to handle user signup
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("this is the username", username);
    console.log("this is the password", password);
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("already exits");
      return res.send("User already exists");
    }
    console.log("this is the existing user", existingUser);
    // Create a new user
    const newUser = new User({
      username,
      password: password, // Save the hashed password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Server error");
  }
};

export const submitFinancialData = async (req, res) => {
  try {
    const {
      userId,
      bankBalance,
      yearlyIncome,
      totalIncomeMonthly,
      totalExpenseMonthly,
      email,
    } = req.body;
    const user = await User.findById(userId);
    console.log("this is the user", user);
    if (!user) {
      return res.status(400).send("User not found");
    }
    user.balance = bankBalance;
    user.email = email;

    await user.save();
    res.status(201).send("Financial data submitted successfully");
  } catch (error) {
    console.error("Error submitting user data:", error);
    res.status(500).send("Server error");
  }
};
