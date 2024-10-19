var express = require('express');
var router = express.Router();
var UC = require('./user.controller');
var authToken = require('../../middleware/authToken');

/* GET home page. */
router.post('/signup', UC.usersCreation)
router.post('/login', UC.usersLogin)
router.get('/', authToken.Authentication,UC.usersAllDataGet)
router.post('/forgot_password',UC.userSendOTP)
router.post('/otp',UC.usersFetchOTP)
router.post('/updatepassword',UC.usersPasswordUpdate)

module.exports = router;
