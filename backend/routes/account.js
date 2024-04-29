const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, Transaction } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;

  // Don't allow transfer to oneself
  if (to === req.userId) {
    await session.abortTransaction();
    return res.json({ message: "Cannot Transfer to yourself!" });
  }

  try {
    // Fetch sender's account within transaction
    const senderAccount = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // Fetch recipient's account within transaction
    const recipientAccount = await Account.findOne({
      userId: to,
    }).session(session);

    if (!recipientAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Update sender's balance within transaction
    senderAccount.balance -= amount;
    await senderAccount.save({ session });

    // Update recipient's balance within transaction
    recipientAccount.balance += amount;
    await recipientAccount.save({ session });

    // Create transaction record for the sender
    const transaction = await Transaction.create({
      senderId: req.userId,
      recipientId: to,
      amount,
      transactionType: 'sent', // Marking the transaction as sent
    });

    // Commit Transaction
    await session.commitTransaction();

    res.json({
      message: "Transfer successful",
      transaction,
    });
  } catch (error) {
    console.error("Error transferring funds:", error);
    await session.abortTransaction();
    res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
});

router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    // Find transactions where the senderId or recipientId matches the userId of the authenticated user
    const transactions = await Transaction.find({
      $or: [{ senderId: req.userId }, { recipientId: req.userId }],
    });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    // Map over transactions to add transactionType field
    const transactionsWithTypes = transactions.map(transaction => ({
      ...transaction.toObject(), // Convert Mongoose document to JavaScript object
      transactionType: transaction.senderId.toString() === req.userId ? 'sent' : 'received',
    }));

    res.json({ transactions: transactionsWithTypes });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
