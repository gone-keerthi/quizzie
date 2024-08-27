
const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/auth_controllers');

const router = express.Router();

// Define validation rules
const validateCreateUser = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Invalid email address.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

//Define validate Login rules

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
  ];
  
// Route to create a new user
router.post('/signup', validateCreateUser, userController.createUser);
// Route to login with password
router.post('/login', validateLogin, userController.login);

module.exports = router;
