const express = require('express');
const router = express.Router();
const { getUser, loginUser, newUser, register, getRegistration } = require('../controllers/userController');

router.get('/add', newUser) ;
router.post('/login', loginUser);
router.get('/registration', getRegistration);
router.post('/registration', register);
router.get('/', getUser);

module.exports = router;
