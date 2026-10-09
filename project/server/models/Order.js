const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  carModel: {
    type: String,
    required: true,
    enum: ['Cobalt', 'Malibu', 'Onix', 'BYD', 'KIA'],
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  comment: {
    type: String,
    trim: true,
    default: '',
  },
  preferredTime: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['new', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'new',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
