let orders = [];
let currentId = 1;

function toNumber(value, fallback) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function createOrder(payload) {
  const order = {
    id: currentId++,
    productName: payload.productName,
    quantity: toNumber(payload.quantity, 0),
    totalPrice: toNumber(payload.totalPrice, 0),
    status: payload.status || "pending",
  };
  orders.push(order);
  return order;
}

function getOrderById(id) {
  return orders.find((order) => order.id === id);
}

function updateOrder(id, payload) {
  const order = getOrderById(id);
  if (!order) return null;

  order.productName = payload.productName;
  order.quantity = toNumber(payload.quantity, order.quantity);
  order.totalPrice = toNumber(payload.totalPrice, order.totalPrice);
  order.status = payload.status ?? order.status;
  return order;
}

function updateStatus(id, status) {
  const order = getOrderById(id);
  if (!order) return null;
  order.status = status;
  return order;
}

function deleteOrder(id) {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return false;
  orders.splice(index, 1);
  return true;
}

function listOrders(page = 1, limit = 10) {
  const total = orders.length;
  const start = (page - 1) * limit;
  const data = orders.slice(start, start + limit);
  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  updateStatus,
  deleteOrder,
  listOrders,
};

