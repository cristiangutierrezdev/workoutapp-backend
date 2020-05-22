const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  create: (body) => {
    const newUser = new User(body);
    return newUser.save();
  },
  find: () => User.find({ is_active: true }),
  findAll: () => User.find(),
  findById: (id) => User.findById(id),
  findByEmail: (email) => User.findOne({ email }),
  update: (user, body) => {
    Object.assign(user, body);
    return user.save();
  },
  comparePasswords: (candidatePassword, password) => {
    return bcrypt.compareSync(candidatePassword, password);
  },
  addRole: (user, role) => {
    user.roles.push(role);
    return user.save();
  },
  updateRole: (user, updatedRole) => {
    const updatedRoles = user.roles.filter((rol) => {
      if(rol._id === updatedRole._id) {
        return updatedRole;
      }
    });
    user.roles = updatedRoles;
    return user.save();
  },
  addWorkout: (user, workout) => {
    user.workouts.push(workout._id);
    return user.save();
  },
  findWorkout: (user, workout) => {
    const idWorkout = workout._id;
    console.log('✅', user);
    if (!user.workouts) return;
    if (user.workouts.length === 0) return;
    try {
      if (user.workouts.includes(idWorkout)) {
        return workout;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },
  deleteWorkout: (user, workoutToDelete) => {
    const newUserWorkouts = user.workouts.filter((id) => {
      console.log('🦷', id, workoutToDelete._id);
      if(id.toString() !== workoutToDelete._id.toString()) return id;
    });
    user.workouts = newUserWorkouts;
    return user.save();
  },
}
