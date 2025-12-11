const express = require('express');
const {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateStatus,
  deleteOrder,
} = require('../services/orderService');
const { authorizeRole } = require('../middleware/authorizeRole');
const {
  validateNewOrder,
  validateOrderUpdate,
  validateStatusUpdate,
} = require('../middleware/validateOrder');

const router = express.Router();

router.get('/', (req, res) => {
  const { page, limit } = req.query;
  const result = listOrders(page, limit);
  res.json(result);
});

router.get('/:id', (req, res) => {
  const order = getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

router.post('/', validateNewOrder, (req, res) => {
  const order = createOrder(req.body);
  res.status(201).json(order);
});

router.put('/:id', authorizeRole('isAdmin'), validateOrderUpdate, (req, res) => {
  const updated = updateOrder(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(updated);
});

router.patch('/:id/status', authorizeRole('isAdmin', 'isEditor'), validateStatusUpdate, (req, res) => {
  const updated = updateStatus(req.params.id, req.body.status);
  if (!updated) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(updated);
});

router.delete('/:id', authorizeRole('isAdmin'), (req, res) => {
  const deleted = deleteOrder(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.status(204).send();
});

module.exports = router;


