const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/:id')
  .get(getOrder)
  .patch(updateOrder)
  .delete(deleteOrder);

module.exports = router;
