const express = require('express');
const router = express.Router();
const { getUser, loginUser, newUser, register, getRegistration, getAllUsers, getRole } = require('../controllers/userController');

router.get('/add', newUser) ;
router.get('/guests', getAllUsers);
router.post('/login', loginUser);
router.get('/registration', getRegistration);
router.post('/registration', register);
router.get('/', getUser);

module.exports = router;
