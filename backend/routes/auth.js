import { Router } from "express";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { User } from "../models/user.js";

const router = Router();

router.post("/username-check", async (req, res) => {
  try {
    const { userName } = req.body;

    // Check if the userName is provided
    if (!userName)
      return res
        .status(400)
        .send({ errors: { main: "Username is required" }, message: "default" });

    // Check whether the user already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(409).send({
        errors: { main: "Username already exist" },
        message: "failed",
      });
    }

    return res.status(200).send({ message: "passed" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ errors: { main: "Internal server error" }, message: "default" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res
        .status(400)
        .send({ errors: { main: error.details[0].message } });

    const { userName, password } = req.body;

    // Check whether  the user not exists
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res
        .status(401)
        .send({ errors: { userName: "Invalid Username!" } });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ errors: { password: "Invalid Password!" } });
    }

    // Generate JWT token
    const accessToken = existingUser.generateAuthToken(
      process.env.JWT_ACC_SECRET,
      "1m"
    );
    const refreshToken = existingUser.generateAuthToken(
      process.env.JWT_REF_SECRET,
      "5m"
    );

    res.cookie("accessToken", accessToken, { maxAge: 60000 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 300000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).send({
      message: "Login successful",
      userName: existingUser.userName,
      role: existingUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errors: { main: "Internal server error" } });
  }
});

const validateLogin = (user) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("User Name"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(user);
};

export default router;
