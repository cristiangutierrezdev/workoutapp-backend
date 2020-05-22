const { Workout } = require('../models/Workout');

module.exports = {
  create: (body) => {
    const newWorkout = new Workout(body);
    return newWorkout.save();
  },
  find: () => Workout.find({ is_active: true }),
  findById: (id) => Workout.findById(id),
  update: (workout, body) => {
    Object.assign(workout, body);
    return workout.save();
  },
}
