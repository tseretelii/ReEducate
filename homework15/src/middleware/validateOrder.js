const ALLOWED_STATUSES = ['pending', 'processing', 'shipped', 'cancelled', 'completed'];
const MAX_QUANTITY = 10;
const MAX_TOTAL_PRICE = 500;

function validateLimits(quantity, totalPrice) {
  if (quantity !== undefined && quantity > MAX_QUANTITY) {
    return 'Quantity cannot exceed 10';
  }
  if (totalPrice !== undefined && totalPrice > MAX_TOTAL_PRICE) {
    return 'Total price cannot exceed 500';
  }
  return null;
}

function validateNewOrder(req, res, next) {
  const { productName, quantity, totalPrice, status } = req.body;

  if (!productName || typeof productName !== 'string' || !productName.trim()) {
    return res.status(400).json({ message: 'productName is required' });
  }

  if (quantity !== undefined && (typeof quantity !== 'number' || quantity <= 0)) {
    return res.status(400).json({ message: 'quantity must be a positive number' });
  }

  if (totalPrice !== undefined && (typeof totalPrice !== 'number' || totalPrice <= 0)) {
    return res.status(400).json({ message: 'totalPrice must be a positive number' });
  }

  if (status && !ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${ALLOWED_STATUSES.join(', ')}` });
  }

  const limitsError = validateLimits(quantity, totalPrice);
  if (limitsError) {
    return res.status(400).json({ message: limitsError });
  }

  next();
}

function validateOrderUpdate(req, res, next) {
  const { productName, quantity, totalPrice, status } = req.body;
  const hasBody = productName !== undefined || quantity !== undefined || totalPrice !== undefined || status !== undefined;

  if (!hasBody) {
    return res.status(400).json({ message: 'At least one field must be provided to update' });
  }

  if (productName !== undefined && (typeof productName !== 'string' || !productName.trim())) {
    return res.status(400).json({ message: 'productName must be a non-empty string when provided' });
  }

  if (quantity !== undefined && (typeof quantity !== 'number' || quantity <= 0)) {
    return res.status(400).json({ message: 'quantity must be a positive number' });
  }

  if (totalPrice !== undefined && (typeof totalPrice !== 'number' || totalPrice <= 0)) {
    return res.status(400).json({ message: 'totalPrice must be a positive number' });
  }

  if (status !== undefined && !ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${ALLOWED_STATUSES.join(', ')}` });
  }

  const limitsError = validateLimits(quantity, totalPrice);
  if (limitsError) {
    return res.status(400).json({ message: limitsError });
  }

  next();
}

function validateStatusUpdate(req, res, next) {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'status is required' });
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${ALLOWED_STATUSES.join(', ')}` });
  }

  next();
}

module.exports = {
  validateNewOrder,
  validateOrderUpdate,
  validateStatusUpdate,
};


