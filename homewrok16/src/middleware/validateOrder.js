function validateOrderPayload(req, res, next) {
  const { productName, quantity, totalPrice } = req.body || {};

  if (!productName || typeof productName !== "string") {
    return res.status(400).json({ error: "productName is required" });
  }

  const qty = Number(quantity);
  const price = Number(totalPrice);

  if (!Number.isFinite(qty) || qty <= 0) {
    return res.status(400).json({ error: "quantity must be a positive number" });
  }

  if (!Number.isFinite(price) || price < 0) {
    return res.status(400).json({ error: "totalPrice must be zero or positive" });
  }

  if (qty > 10) {
    return res.status(400).json({ error: "quantity cannot exceed 10" });
  }

  if (price > 500) {
    return res.status(400).json({ error: "totalPrice cannot exceed 500" });
  }

  next();
}

function validateStatus(req, res, next) {
  const { status } = req.body || {};
  if (!status || typeof status !== "string") {
    return res.status(400).json({ error: "status is required" });
  }
  next();
}

module.exports = {
  validateOrderPayload,
  validateStatus,
};

