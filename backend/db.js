const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const transactionSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['sent', 'received'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account,
  Transaction: mongoose.model("Transaction", transactionSchema),
};
