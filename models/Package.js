const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    enum: [10, 20, 40, 80, 160, 320, 640, 1280]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'MERGED', 'COMPLETED'],
    default: 'ACTIVE'
  },
  mergedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    default: null
  },
  mergedAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Package', packageSchema); 