const Package = require('../models/Package');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.createPackage = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    // Validate amount is in allowed values
    const allowedAmounts = [10, 20, 40, 80, 160, 320, 640, 1280];
    if (!allowedAmounts.includes(amount)) {
      return res.status(400).json({ message: 'Invalid package amount' });
    }

    // Create new package
    const newPackage = new Package({
      amount,
      userId
    });

    await newPackage.save();

    // Try to find a matching package to merge
    const matchingPackage = await Package.findOne({
      amount: amount,
      userId: { $ne: userId },
      status: 'ACTIVE',
      mergedWith: null
    });

    if (matchingPackage) {
      // Merge packages
      const mergedAmount = amount * 2;
      
      // Update both packages
      await Promise.all([
        Package.findByIdAndUpdate(newPackage._id, {
          status: 'MERGED',
          mergedWith: matchingPackage._id,
          mergedAmount
        }),
        Package.findByIdAndUpdate(matchingPackage._id, {
          status: 'MERGED',
          mergedWith: newPackage._id,
          mergedAmount
        })
      ]);

      // Create new package with merged amount if not $80
      if (mergedAmount !== 80) {
        const mergedPackage = new Package({
          amount: mergedAmount,
          userId,
          status: 'ACTIVE'
        });
        await mergedPackage.save();
      } else {
        // Handle $80 package completion
        // Add to user's earnings
        await User.findByIdAndUpdate(userId, {
          $inc: { earnings: mergedAmount }
        });
      }
    }

    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Package creation error:', error);
    res.status(500).json({ message: 'Error creating package', error: error.message });
  }
};

exports.withdrawEarnings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user.earnings) {
      return res.status(400).json({ message: 'No earnings to withdraw' });
    }

    // Calculate withdrawal amount with 10% fee for direct income
    const withdrawalFee = user.earnings * 0.1;
    const withdrawalAmount = user.earnings - withdrawalFee;

    // Create withdrawal transaction
    const transaction = new Transaction({
      userId,
      type: 'WITHDRAWAL',
      amount: withdrawalAmount,
      fee: withdrawalFee,
      status: 'COMPLETED'
    });

    // Update user's earnings
    user.earnings = 0;
    
    await Promise.all([
      transaction.save(),
      user.save()
    ]);

    res.json({
      withdrawalAmount,
      fee: withdrawalFee,
      transaction
    });
  } catch (error) {
    console.error('Withdrawal error:', error);
    res.status(500).json({ message: 'Error processing withdrawal' });
  }
};

exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages' });
  }
}; 