const express = require('express');
const router = express.Router();
const { getAllUsers, signInUser, newUser } = require('../controllers/userController');

router.get('/add', newUser) ;
router.get('/', getAllUsers);

module.exports = router;
