import React, { useState } from "react";
// import Components
import Dashboard from "../Dashboard/Dashboard";
import Analytics from "../AnalyticsPage/Analytics";
import CreateQuiz from "../CreateQuizPage/CreateQuiz";
// import styles
import "./appbar.css";
const AppBar = () => {
  const [dashboardComponent, setDashboardComponent] = useState(false);
  const [AnalyticsComponent, setAnalyticsComponent] = useState(false);
  const [CreateQuizComponent, setCreateQuizComponent] = useState(false);

  const handleDashboardClick = () => {
    setDashboardComponent(true);
    setAnalyticsComponent(false);
    setCreateQuizComponent(false);
  };
  const handleAnalyticsClick = () => {
    setDashboardComponent(false);
    setAnalyticsComponent(true);
    setCreateQuizComponent(false);
  };
  const handleCreateQuizClick = () => {
    setDashboardComponent(false);
    setAnalyticsComponent(false);
    setCreateQuizComponent(true);
  };
  return (
    <>
      <div className="appbar-page">
        <div className="appbar-component">
          <div className="menu-container">
            <h1>QUIZZIE</h1>
            <ul>
              <li onClick={handleDashboardClick}>Dashboard</li>
              <li onClick={handleAnalyticsClick}>Analytics</li>
              <li onClick={handleCreateQuizClick}>Create Quiz</li>
            </ul>

            <button>LOGOUT</button>
          </div>
          <div className="corresponding-section-container">
            {dashboardComponent && <Dashboard />}
            {AnalyticsComponent && <Analytics />}
            {CreateQuizComponent && <CreateQuiz />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppBar;
