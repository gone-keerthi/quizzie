const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const quizController = require('../controllers/quizz_controller');
const authMiddleware = require('../middlewares/auth_middleware'); 

router.post('/createquiz',authMiddleware, quizController.createQuiz);
router.get('/quizzes', quizController.allQuizzes);
router.delete('/delete/:id', quizController.deleteQuiz);
router.get('/:id', quizController.getQuizById);
router.post('/:id/countViews', quizController.updateQuizCount);

module.exports = router;