const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./userModel");

const QuizTypes = ["Q&A", "POLL"];
const OptionTypes = ["text", "imageURL", "text&ImageURL"];

const quizSchema = new Schema(
  {
    quizName: {
      type: String,
      required: true,
    },
    impressionns: {
      type: Number,
      default: 0,
    },
    quizType: QuizTypes,
    questions: [
      {
        questionName: {
          type: String,
          required: true,
        },
        options: [
          {
            optionType: OptionTypes,
            optionName: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quizz = mongoose.model("Quizz", quizSchema);
module.exports = Quizz;
