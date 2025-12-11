const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.use(auth);

// Get all users with their expenses
router.get("/", async (_req, res) => {
  const users = await User.find().select("-password").populate("expenses");
  return res.json(users);
});

// Get single user with expenses
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("expenses");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
});

module.exports = router;

