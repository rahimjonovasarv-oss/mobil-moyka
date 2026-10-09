const Order = require('../models/Order');

const CAR_PRICES = {
  Cobalt: 100000,
  Malibu: 110000,
  Onix: 250000,
  BYD: 239999,
  KIA: 234500,
};

function validateOrder(body) {
  const errors = [];
  if (!body.name || !body.name.trim()) errors.push('Name is required');
  if (!body.phone || !body.phone.trim()) errors.push('Phone is required');
  if (!body.carModel || !CAR_PRICES[body.carModel]) errors.push('Valid carModel is required');
  if (!body.address || !body.address.trim()) errors.push('Address is required');
  return errors;
}

// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const errors = validateOrder(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const order = await Order.create({
      name: req.body.name.trim(),
      phone: req.body.phone.trim(),
      carModel: req.body.carModel,
      price: CAR_PRICES[req.body.carModel],
      address: req.body.address.trim(),
      comment: req.body.comment ? req.body.comment.trim() : '',
      preferredTime: req.body.preferredTime ? req.body.preferredTime.trim() : '',
      status: 'new',
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/orders/:id
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PATCH /api/orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const validStatuses = ['new', 'accepted', 'in_progress', 'completed', 'cancelled'];
    if (req.body.status && !validStatuses.includes(req.body.status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /api/orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
