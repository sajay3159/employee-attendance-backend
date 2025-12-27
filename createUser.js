import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.model.js";

dotenv.config();

const createUser = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.create({
    name: "Noah Clark",
    email: "noah.clark@example.com",
    password: "Password123!",
    role: "employee",
  });

  console.log("User created:", user.email);

  process.exit();
};

createUser();
