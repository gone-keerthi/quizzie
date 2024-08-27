const mongoose = require('mongoose');
const { Schema } = mongoose;
const Quizz = require('./quizzModel')
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  quizzes:[{
    type: Schema.Types.ObjectId,
    ref: 'Quizz',  // Reference to the Quiz model
  }],
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
