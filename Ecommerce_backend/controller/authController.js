import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User does not exists");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login Successfull",
      token: token,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Required fields check
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { loginUser, registerUser };
