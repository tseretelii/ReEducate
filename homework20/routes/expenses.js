const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.get("/", async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id })
    .sort({ date: -1 })
    .populate("user", "name email");
  return res.json(expenses);
});

router.post("/", async (req, res) => {
  try {
    const { description, amount, date, category } = req.body;

    if (!description || amount == null) {
      return res
        .status(400)
        .json({ message: "Description and amount are required" });
    }

    const expense = await Expense.create({
      user: req.user.id,
      description,
      amount,
      date,
      category,
    });

    return res.status(201).json(expense);
  } catch (err) {
    console.error("Create expense error", err);
    return res.status(500).json({ message: "Could not create expense" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    ).populate("user", "name email");

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json(expense);
  } catch (err) {
    console.error("Update expense error", err);
    return res.status(500).json({ message: "Could not update expense" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error("Delete expense error", err);
    return res.status(500).json({ message: "Could not delete expense" });
  }
});

module.exports = router;

