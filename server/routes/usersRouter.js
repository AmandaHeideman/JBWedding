const express = require('express');
const router = express.Router();
const { getAllUsers, loginUser, newUser } = require('../controllers/userController');

router.get('/add', newUser) ;
router.post('/login', loginUser)
router.get('/', getAllUsers);

module.exports = router;
