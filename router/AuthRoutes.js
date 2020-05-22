const express = require('express');
const router = express.Router();
const { UserController } = require('../controller');

router.post('/users/signup', UserController.signup);
router.post('/users/login', UserController.login);

module.exports = router;