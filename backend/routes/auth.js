import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_to_strong_secret";

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!password || (!email && !phone)) {
      return res.status(400).json({ message: "Provide password and either email or phone." });
    }

    // check existing
    if (email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: "Email already in use." });
    }
    if (phone) {
      const exists = await User.findOne({ phone });
      if (exists) return res.status(400).json({ message: "Phone already in use." });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, phone, passwordHash });
    await user.save();

    // optionally: send verification email/OTP here

    // create token (or create session)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // send token and user info (do not send password)
    res.json({ message: "User created", token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login success", token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
