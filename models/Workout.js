const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  short_description: {
    type: String,
    required: true,
  },
  long_description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
  },
  cancellation_time: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
