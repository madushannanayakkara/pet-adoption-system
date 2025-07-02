import { Router } from "express";

import { verifyUser } from "../middleware/authMiddleware.js";
import Pet from "../models/pet.js";

const router = Router();

router.post("/", verifyUser, async (req, res) => {
  const pet = new Pet(req.body);
  await pet.save();
  res.status(201).json(pet);
});

router.delete("/:id", verifyUser, async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Pet deleted" });
});

router.get("/", verifyUser, async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

export default router;
