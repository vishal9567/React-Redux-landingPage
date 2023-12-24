import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
