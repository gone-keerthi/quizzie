const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const userRoutes = require('./routes/auth_routes');
const QuizRoutes = require('./routes/quiz_routes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

app.get("/test", (req, res) => {
  res.send("Welcome");
  // console.log("login");
});

app.use('/users', userRoutes);
app.use('/quizze', QuizRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});
