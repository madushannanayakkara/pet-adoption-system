import { Router } from "express";
import bcrypt from "bcryptjs";
import { User, validateUser } from "../models/user.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(400)
        .send({ errors: { main: error.details[0].message } });

    const {
      userName,
      firstName,
      lastName,
      contactNo,
      email,
      nicNumber,
      password,
      role,
    } = req.body;

    const existingUser = await User.findOne({ userName });
    if (existingUser)
      return res
        .status(409)
        .send({ errors: { userName: "Username already exists" } });

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      userName,
      firstName,
      lastName,
      contactNo,
      email,
      nicNumber,
      password: hashedPassword,
      role: role || "user",
    });

    // Save the user to the database
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errors: { main: "Internal server error" } });
  }
});

export default router;
