const express = require('express');
const { register, login, authUser, changePassword } = require('../controllers/authCtrl');
const { getUser } = require('../controllers/userRoute');
const { authToken } = require('../middleware/auth');
const router = express.Router();

//AUTH
router.route('/auth/register').post(register);
router.route('/auth/login').post(login);
router.route('/auth').get(authToken, authUser);
router.route('/auth/password').put(authToken, changePassword);

//USERS
router.route('/:id').get(getUser);

module.exports = router;
