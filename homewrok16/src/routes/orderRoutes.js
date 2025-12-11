const express = require("express");
const {
  createOrder,
  getOrderById,
  updateOrder,
  updateStatus,
  deleteOrder,
  listOrders,
} = require("../services/orderService");
const { isAdmin, isEditor } = require("../middleware/roleCheck");
const { validateOrderPayload, validateStatus } = require("../middleware/validateOrder");
const secretGuard = require("../middleware/secretGuard");

const router = express.Router();

router.get("/secret", secretGuard, (req, res) => {
  res.json({ message: "Top secret orders endpoint reached" });
});

router.get("/", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const results = listOrders(page, limit);
  res.json(results);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const order = getOrderById(id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

router.post("/", validateOrderPayload, (req, res) => {
  const order = createOrder(req.body);
  res.status(201).json(order);
});

router.put("/:id", isAdmin, validateOrderPayload, (req, res) => {
  const id = Number(req.params.id);
  const order = updateOrder(id, req.body);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

router.patch("/:id/status", isEditor, validateStatus, (req, res) => {
  const id = Number(req.params.id);
  const order = updateStatus(id, req.body.status);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

router.delete("/:id", isAdmin, (req, res) => {
  const id = Number(req.params.id);
  const deleted = deleteOrder(id);
  if (!deleted) return res.status(404).json({ error: "Order not found" });
  res.status(204).send();
});

module.exports = router;

