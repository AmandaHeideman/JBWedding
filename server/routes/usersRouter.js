const express = require('express');
const router = express.Router();
const { getAllUsers, loginUser, newUser, register } = require('../controllers/userController');

router.get('/add', newUser) ;
router.post('/login', loginUser)
router.post('/registration', register)
router.get('/', getAllUsers);

module.exports = router;
