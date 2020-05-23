const express = require('express');
const router = express.Router();
const { WorkoutController } = require('../controller');
const { WorkoutValidator } = require('../validators')

router.post('/workout', WorkoutController.create);
router.get('/workout', WorkoutController.find);
router.get('/workout/:id', WorkoutController.findById);
router.patch('/workout/:id', WorkoutController.findByIdAndUpdate);
router.delete('/workout/:id', WorkoutController.findByIdAndDelete);

router.post('/users/:id/workout', WorkoutValidator.addWorkoutToUser ,WorkoutController.addWorkoutToUser);
router.get('/users/:id/workout', WorkoutController.findUserWorkouts);
router.get('/users/:idUser/workout/:idWorkout', WorkoutController.findUserWorkoutById);
router.delete('/users/:idUser/workout/:idWorkout', WorkoutController.deleteUserWorkoutById);

module.exports = router;