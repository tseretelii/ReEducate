const orders = [];
let nextId = 1;

function toNumber(value, fallback) {
  if (value === undefined) return fallback;
  return Number(value);
}

function listOrders(page = 1, limit = 10) {
  const numericPage = Math.max(1, toNumber(page, 1));
  const numericLimit = Math.max(1, toNumber(limit, 10));
  const start = (numericPage - 1) * numericLimit;
  const paginated = orders.slice(start, start + numericLimit);

  return {
    data: paginated,
    page: numericPage,
    limit: numericLimit,
    total: orders.length,
  };
}

function getOrderById(id) {
  return orders.find((order) => order.id === Number(id));
}

function createOrder({ productName, quantity = 1, totalPrice = 0, status = 'pending' }) {
  const order = {
    id: nextId++,
    productName,
    quantity,
    totalPrice,
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
}

function updateOrder(id, updates) {
  const order = getOrderById(id);
  if (!order) return null;

  const allowedFields = ['productName', 'quantity', 'totalPrice', 'status'];
  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) {
      order[field] = updates[field];
    }
  });
  order.updatedAt = new Date().toISOString();
  return order;
}

function updateStatus(id, status) {
  return updateOrder(id, { status });
}

function deleteOrder(id) {
  const index = orders.findIndex((order) => order.id === Number(id));
  if (index === -1) return false;
  orders.splice(index, 1);
  return true;
}

module.exports = {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateStatus,
  deleteOrder,
};


