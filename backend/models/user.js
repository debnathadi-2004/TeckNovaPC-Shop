import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  emailVerified: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
