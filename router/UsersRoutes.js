const express = require('express');
const router = express.Router();
const { UserController } = require('../controller');
const { UsersValidator } = require('../validators')

router.post('/users', UsersValidator.create, UserController.create);
router.get('/users', UserController.find);
router.get('/users/all', UserController.findAll);
router.get('/users/:id', UserController.findById);
router.patch('/users/:id', UserController.findByIdAndUpdate);
router.delete('/users/:id', UserController.findByIdAndDelete);

module.exports = router;