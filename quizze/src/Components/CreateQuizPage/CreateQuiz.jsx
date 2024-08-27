import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuizName,
  setQuizType,
  setQuestions,
} from "../../Actions/quizSlice";

// import styles
import "./createquiz.css";

// import assets
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const quiz = useSelector((state) => state.quiz);

  // First component state
  const [quizFirstComponent, setQuizFirstComponent] = useState(true);
  const [quizName, setQuizNameState] = useState("");
  const [quizType, setQuizTypeState] = useState("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Second component state
  const MAX_QUESTIONS = 5;
  const MAX_OPTIONS = 4;
  const [quizSecondComponent, setQuizSecondComponent] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      question: "",
      optionType: "Text",
      options: [{ id: Date.now(), type: "Text", value: "" }],
    },
  ]);

  // Third component state
  const [quizThirdComponent, setQuizThirdComponent] = useState(false);

  const handleQuizThirdComponent = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
      if (!token) throw new Error("No token found");
      if (!userId) throw new Error("No userId found");
  
      console.log("get token:", token);
      console.log("get userId:", userId);
  
      const response = await axios.post(
        "http://localhost:5000/quizze/createQuiz",
        {
          quizName: quiz.quizName,
          quizType: quiz.quizType,
          questions: quiz.questions,
          userId: userId, // Include userId in the request body
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("Quiz created successfully:", response.data);
      setQuizThirdComponent(true);
      setQuizSecondComponent(false);
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz.");
    }
  };
  

  const handlePublicQuizThirdComponentclose = () => {
    setQuizThirdComponent(false);
  };

  const handleShareClick = () => {
    toast.success("Link copied to Clipboard", {
      duration: 4000,
      position: "top-right",
    });
  };

  // First component event handlers
  const handleQuizFirstComponent = () => {
    dispatch(setQuizName(quizName));
    dispatch(setQuizType(quizType));
    setQuizFirstComponent(false);
    setQuizSecondComponent(true);
  };

  const handleQuizNameChange = (event) => {
    setQuizNameState(event.target.value);
  };

  const handleQuizTypeChange = (event) => {
    setQuizTypeState(event.target.value);
  };

  const handlefirstCancelBtnClick = () => {
    setQuizNameState("");
    setQuizTypeState("");
    setQuizFirstComponent(false);
    setQuizSecondComponent(false);
  };

  // Second component event handlers
  const handleAddQuestionClick = () => {
    if (questions.length < MAX_QUESTIONS) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          id: Date.now(),
          question: "",
          optionType: "Text",
          options: [{ id: Date.now(), type: "Text", value: "" }],
        },
      ]);
      setCurrentSlideIndex(questions.length);
    }
  };

  const handleQuestionChange = (event) => {
    const newQuestionText = event.target.value;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === currentSlideIndex
          ? { ...question, question: newQuestionText }
          : question
      )
    );
  };

  const handleOptionTypeChange = (questionId, event) => {
    const newOptionType = event.target.value;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              optionType: newOptionType,
              options: [{ id: Date.now(), type: newOptionType, value: "" }],
            }
          : question
      )
    );
  };

  const handleAddOptionClick = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options:
                question.options.length < MAX_OPTIONS
                  ? [
                      ...question.options,
                      { id: Date.now(), type: question.optionType, value: "" },
                    ]
                  : question.options,
            }
          : question
      )
    );
  };

  const handleDeleteOptionClick = (questionId, optionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter(
                (option) => option.id !== optionId
              ),
            }
          : question
      )
    );
  };

  const handleOptionChange = (questionId, optionId, event) => {
    const newValue = event.target.value;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId ? { ...option, value: newValue } : option
              ),
            }
          : question
      )
    );
  };

  const handleSlideChange = (index) => {
    setCurrentSlideIndex(index);
  };

  const handleDeleteQuestionClick = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== questionId)
    );
    if (currentSlideIndex >= questions.length - 1) {
      setCurrentSlideIndex(Math.max(0, questions.length - 2));
    }
  };

  const handlesecondCancel = () => {
    setQuizFirstComponent(true);
    setQuizSecondComponent(false);
  };

  return (
    <>
      {quizFirstComponent && (
        <div className="createQuizPage">
          <div className="createquiz-component">
            <input
              id="text"
              type="text"
              placeholder="Quiz Name"
              onChange={handleQuizNameChange}
              value={quizName}
            />
            <div className="quiz-type-options">
              <label htmlFor="quizType">QUIZ TYPE</label>
              <label className="quiz-type-option">
                <input
                  type="radio"
                  name="quizType"
                  checked={quizType === "poll"}
                  value="poll"
                  onChange={handleQuizTypeChange}
                />
                Poll
              </label>
              <label className="quiz-type-option">
                <input
                  type="radio"
                  name="quizType"
                  checked={quizType === "qa"}
                  value="qa"
                  onChange={handleQuizTypeChange}
                />
                QA
              </label>
            </div>
            <div className="create-quiz-btn-group">
              <button
                className="cancel-btn"
                onClick={handlefirstCancelBtnClick}
              >
                Cancel
              </button>
              <button className="continue-btn" onClick={handleQuizFirstComponent}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {quizSecondComponent && (
        <div className="create-quiz">
          <div className="create-question-component">
            <div className="forQNA-component">
              <div className="slide-indicators-container">
                {questions.map((_, index) => (
                  <div className="slide-indicator" key={index}>
                    <span
                      className={`slide-indicator-item ${
                        index === currentSlideIndex ? "active" : ""
                      }`}
                      onClick={() => handleSlideChange(index)}
                    >
                      {index + 1}
                    </span>
                    <IoCloseSharp
                      onClick={() =>
                        handleDeleteQuestionClick(questions[index].id)
                      }
                      className="question-delete-icon"
                    />
                  </div>
                ))}
                <button
                  className="add-question-btn"
                  onClick={handleAddQuestionClick}
                  disabled={questions.length >= MAX_QUESTIONS}
                >
                  <TiPlus />
                </button>
              </div>
              <div className="create-question-body">
                <input
                  id="question-name"
                  type="text"
                  placeholder="Poll Question"
                  value={questions[currentSlideIndex]?.question || ""}
                  onChange={handleQuestionChange}
                />
                <div className="option-type-options">
                  <label htmlFor="optionType">Option type</label>
                  <label className="option-type-option">
                    <input
                      type="radio"
                      name={`optionType-${questions[currentSlideIndex]?.id}`}
                      value="Text"
                      checked={
                        questions[currentSlideIndex]?.optionType === "Text"
                      }
                      onChange={(e) =>
                        handleOptionTypeChange(
                          questions[currentSlideIndex]?.id,
                          e
                        )
                      }
                    />
                    Text
                  </label>
                  <label className="option-type-option">
                    <input
                      type="radio"
                      name={`optionType-${questions[currentSlideIndex]?.id}`}
                      value="Image URL"
                      checked={
                        questions[currentSlideIndex]?.optionType === "Image URL"
                      }
                      onChange={(e) =>
                        handleOptionTypeChange(
                          questions[currentSlideIndex]?.id,
                          e
                        )
                      }
                    />
                    Image URL
                  </label>
                  <label className="option-type-option">
                    <input
                      type="radio"
                      name={`optionType-${questions[currentSlideIndex]?.id}`}
                      value="Text & Image URL"
                      checked={
                        questions[currentSlideIndex]?.optionType ===
                        "Text & Image URL"
                      }
                      onChange={(e) =>
                        handleOptionTypeChange(
                          questions[currentSlideIndex]?.id,
                          e
                        )
                      }
                    />
                    Text & Image URL
                  </label>
                </div>
                <div className="question-options-container">
                  {questions[currentSlideIndex]?.optionType === "Text" && (
                    <>
                      {questions[currentSlideIndex]?.options.map((option) => (
                        <div key={option.id} className="question-options">
                          <input
                            className="option-name"
                            id={`option-text-${option.id}`}
                            type="text"
                            placeholder="Text"
                            value={option.value}
                            onChange={(e) =>
                              handleOptionChange(
                                questions[currentSlideIndex].id,
                                option.id,
                                e
                              )
                            }
                          />
                          <RiDeleteBin5Line
                            onClick={() =>
                              handleDeleteOptionClick(
                                questions[currentSlideIndex].id,
                                option.id
                              )
                            }
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </div>
                      ))}
                    </>
                  )}
                  {questions[currentSlideIndex]?.optionType === "Image URL" && (
                    <>
                      {questions[currentSlideIndex]?.options.map((option) => (
                        <div key={option.id} className="question-options">
                          <input
                            className="option-name"
                            id={`option-image-${option.id}`}
                            type="text"
                            placeholder="Image URL"
                            value={option.value}
                            onChange={(e) =>
                              handleOptionChange(
                                questions[currentSlideIndex].id,
                                option.id,
                                e
                              )
                            }
                          />
                          <RiDeleteBin5Line
                            onClick={() =>
                              handleDeleteOptionClick(
                                questions[currentSlideIndex].id,
                                option.id
                              )
                            }
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </div>
                      ))}
                    </>
                  )}
                  {questions[currentSlideIndex]?.optionType ===
                    "Text & Image URL" && (
                    <>
                      {questions[currentSlideIndex]?.options.map(
                        (option) => (
                          <div key={option.id} className="question-options">
                            <input
                              className="option-name"
                              id={`option-text-${option.id}`}
                              type="text"
                              placeholder="Text"
                              value={option.value}
                              onChange={(e) =>
                                handleOptionChange(
                                  questions[currentSlideIndex].id,
                                  option.id,
                                  e
                                )
                              }
                            />
                            <input
                              className="option-name"
                              id={`option-image-${option.id}`}
                              type="text"
                              placeholder="Image URL"
                              value={option.value}
                              onChange={(e) =>
                                handleOptionChange(
                                  questions[currentSlideIndex].id,
                                  option.id,
                                  e
                                )
                              }
                            />
                            <RiDeleteBin5Line
                              onClick={() =>
                                handleDeleteOptionClick(
                                  questions[currentSlideIndex].id,
                                  option.id
                                )
                              }
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </div>
                        )
                      )}
                    </>
                  )}
                  <button
                    id="add-option-btn"
                    onClick={() =>
                      handleAddOptionClick(questions[currentSlideIndex].id)
                    }
                  >
                    Add Option
                  </button>
                </div>
                <div className="create-question-btn-grp">
                  <button
                    className="question-cancel-btn"
                    onClick={handlesecondCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="create-quiz-btn"
                    onClick={handleQuizThirdComponent}
                  >
                    Create Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {quizThirdComponent && (
        <div className="quiz-publish-component">
          <div className="quiz-publish-container">
            <IoCloseSharp
              id="publish-component-close-icon"
              onClick={handlePublicQuizThirdComponentclose}
            />
            <h1>Congrats your Quiz is Published!</h1>
            <p>Your link is here</p>
            <button id="share-btn" onClick={handleShareClick}>
              Share
            </button>
            <Toaster />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateQuiz;

