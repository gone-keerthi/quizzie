import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import styles
import "./dashboard.css";

const Dashboard = () => {
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/quizze/quizzes");
      setQuizData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch quiz data.");
      setIsLoading(false); // Ensure loading state is updated in case of error
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const totalQuestions = quizData.reduce((acc, quiz) => acc + quiz.questions.length, 0);

  return (
    <>
      <div className="dashboard-page">
        <div className="dashboard-component">
          <div className="dashboard-header">
            <div className="dashboard-header-card">
              <h1>
                {quizData.length} <sub>Quiz</sub>
              </h1>
              <h3>Created</h3>
            </div>
            <div className="dashboard-header-card">
              <h1>
                {totalQuestions} <sub>Questions</sub>
              </h1>
              <h3>Created</h3>
            </div>
            <div className="dashboard-header-card">
              <h1>
                1.4K <sub>Total</sub>
              </h1>
              <h3>Impressions</h3>
            </div>
          </div>
          <div className="dashboard-main-section">
            <div className="dashboard-main-section-card">
              <h1>Trending Quizzes</h1>
              <div className="dashboard-main-section-card-list">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  quizData.map((item, index) => (
                    <div key={index} className="dashboard-main-section-card-item">
                      <div>
                        <h4>{item.quizName}</h4>
                        <p style={{color:"#ff5d01"}}>{item.impressionns}</p>
                      </div>
                      <p style={{color:"#FF5D01"}}>{new Date(item.createdAt).toLocaleDateString()}</p>
                      {/* <p style={{marginTop: "0", color: "#60b84b"}}>{item.questions.length} Questions</p> */}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Dashboard;
