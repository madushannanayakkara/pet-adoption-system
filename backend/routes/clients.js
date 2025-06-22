import { Router } from "express";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/test", verifyUser, (req, res) => {
  res.send({
    message: "Test route is working!",
    errors: { goAuthPage: false },
  });
});

// module.exports = router;
export default router;
