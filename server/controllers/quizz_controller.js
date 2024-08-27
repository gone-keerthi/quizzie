const { default: mongoose } = require("mongoose");
const Quiz = require("../models/quizzModel");
const User = require('../models/userModel');

exports.createQuiz = async (req, res) => {
  const { quizName, quizType, questions, userId } = req.body; // Include userId in the request body
  try {
    const newQuiz = new Quiz({
      quizName,
      quizType,
      questions,
      userId,
    });
    await newQuiz.save();

    // Fetch the user and update their quizzes array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.quizzes.push(newQuiz._id);
    await user.save();

    res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    console.log("Quiz creation failed");
    res.status(400).json({ message: error.message });
  }
};



exports.allQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (error) {
    console.error("Error retrieving quizzes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.getQuizById = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid ID format" });
//   }
//   try {
//     const quiz = await Quiz.findById(id);
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }
//     res.json(quiz);
//   } catch (error) {
//     console.error("Error retrieving quiz:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully", deletedQuiz });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getQuizById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    console.error("Error retrieving quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to handle updating the count of a quiz
exports.updateQuizCount = async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quiz.impressionns = count;
    await quiz.save();

    res.status(200).json({ message: "Count updated successfully", quiz });
  } catch (error) {
    console.error("Error updating count:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
