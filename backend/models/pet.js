import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDay: {
    type: Date,
  },
  description: {
    type: String,
  },
  weight: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  medicalStatus: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "requested", "adopted"],
    default: "available",
  },
});

const Pet = mongoose.model("pet", petSchema);

export { Pet };
