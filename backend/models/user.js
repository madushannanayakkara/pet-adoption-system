import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nicNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.methods.generateAuthToken = function (secretKey, expiresIn) {
  const token = jwt.sign(
    { _id: this._id, userName: this.userName },
    secretKey,
    { expiresIn }
  );

  return token;
};

const User = mongoose.model("user", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("User Name"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    contactNo: Joi.string().required().label("Contact Number"),
    email: Joi.string().email().required().label("Email"),
    nicNumber: Joi.string().required().label("NIC Number"),
    password: passwordComplexity().required().label("Password"),
    role: Joi.string().valid("admin", "user").default("user").label("Role"),
  });

  return schema.validate(user, { abortEarly: false, stripUnknown: true });
};

export { User, validateUser };
