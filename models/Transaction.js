const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hash: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['SEND', 'RECEIVE', 'SWAP', 'APPROVE']
  },
  amount: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'COMPLETED', 'FAILED']
  },
  gasFee: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema); 