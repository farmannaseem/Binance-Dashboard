const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { hash, type, amount, token, status, gasFee } = req.body;
    const transaction = new Transaction({
      userId: req.user.userId,
      hash,
      type,
      amount,
      token,
      status,
      gasFee,
      timestamp: new Date()
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error adding transaction' });
  }
}; 