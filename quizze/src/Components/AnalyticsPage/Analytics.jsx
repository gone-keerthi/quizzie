import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiShareFill } from "react-icons/ri";
import "./analysis.css";

const Analytics = () => {
  const [quizAnalytics, setQuizAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareIcon, setShareIcon] = useState(false);
  const [editIcon, setEditIcon] = useState(false);
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const fetchQuizAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/quizze/quizzes");
      setQuizAnalytics(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch quiz data.");
    }
  };

  const handleShareClick = () => {
    toast.success("Link copied to Clipboard", {
      duration: 4000,
      position: "top-right",
    });
    setShareIcon(true);
  };

  const handleEditClick = () => {
    setEditIcon(!editIcon);
  };

  const handleDeleteClick = (id) => {
    setSelectedQuizId(id);
    setDeleteIcon(true);
  };

  const handleLinkClick = async (event, quizId) => {
    event.preventDefault();
    try {
      const incrementBy = 1;
      const newCount = count + incrementBy;
      setCount(newCount);
      await axios.post(`http://localhost:5000/quizze/${quizId}/countViews`, { count: newCount });
      const response = await axios.get(`http://localhost:5000/quizze/${quizId}`);
      console.log('Quiz fetched:', response.data);
    } catch (error) {
      console.error('Error updating count or fetching quiz:', error);
    }
  };
  

  const confirmDelete = async () => {
    if (selectedQuizId) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/quizze/delete/${selectedQuizId}`
        );
        console.log(response);
        toast.success("Quiz deleted Successfully", {
          duration: 4000,
          position: "top-right",
        });
        setDeleteIcon(false);
        fetchQuizAnalytics(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  const handleCloseClick = () => {
    setDeleteIcon(false);
  };

  useEffect(() => {
    fetchQuizAnalytics();
    console.log(quizAnalytics);
  }, []);

  return (
    <>
      <div className="analytics-page">
        <div className="analytics-component">
          <h1>Quiz Analysis</h1>
          <table className="analytics-component-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Quiz Name</th>
                <th>Created on</th>
                <th>Impression</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {quizAnalytics.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td>{index + 1}</td>
                  <td>{quiz.quizName}</td>
                  <td>{new Date(quiz.createdAt).toLocaleDateString()}</td>
                  <td>{quiz.impressionns}</td>
                  <td>
                    <a>
                      <BiEdit onClick={handleEditClick} className="edit-icon" />
                    </a>
                  </td>
                  <td>
                    <a>
                      <RiDeleteBin5Line
                        onClick={() => handleDeleteClick(quiz._id)}
                        className="delete-icon"
                      />
                    </a>
                  </td>
                  <td>
                    <RiShareFill
                      onClick={handleShareClick}
                      className="share-icon"
                    />
                  </td>
                  <td>
                  <p onClick={(e) => handleLinkClick(e, quiz._id)}>Question Wise Analysis</p>

                    {/* <a href="https://web.whatsapp.com/" onClick={handleLinkClick}>Question Wise Analysis</a> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {shareIcon && (
          <div className="share-popup">
            <Toaster />
          </div>
        )}
        {deleteIcon && (
          <div className="delete-component">
            <div className="delete-popup">
              <h1>Are you sure you want to delete?</h1>
              <div className="delete-popup-btn-group">
                <button className="delete-confirm-btn" onClick={confirmDelete}>
                  Confirm Delete
                </button>
                <button className="cancel-btn" onClick={handleCloseClick}>
                  Cancel
                </button>
                <Toaster />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Analytics;
