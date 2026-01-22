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
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login Successfull",
      token: token,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      return res.status(400).send("All fields are required");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const saltingRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltingRounds);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();
    res.status(201).send("Registered Successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export { signupUser, loginUser };
