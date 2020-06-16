const { UserService, WorkoutService } = require('../services');

module.exports = {
  create: async (req, res) => {
    try {
      const workout = await WorkoutService.create(req.body);
      res.status(201).send(workout)
    } catch (err) {
      res.status(400).send({ message: 'Error creating workout', err }); 
    }
  },
  find: async (req, res) => {
    try {
      const workouts = await WorkoutService.find({is_active: true});
      res.status(200).send(workouts)
    } catch (err) {
      res.status(404).send({ message: 'Workouts not found', err });
    }
  },
  findAll: async (req, res) => {
    try {
      const workouts = await WorkoutService.find({is_active: true}).populate("teacher");
      res.status(200).send(workouts)
    } catch (err) {
      res.status(404).send({ message: 'Workouts not found', err });
    }
  },
  findWithTeacher: async (req, res) => {
    try {
      const workouts = await WorkoutService.find({is_active: true}).populate("teacher");
      res.status(200).send(workouts)
    } catch (err) {
      res.status(404).send({ message: 'Workouts not found', err });
    }
  },
  findById: async (req, res) => {
    const { id } = req.params;
    try {
      const workout = await WorkoutService.findById(id);
      res.status(200).send(workout)
    } catch (err) {
      res.status(404).send({ message: 'Workout not found', err });
    }
  },
  findByIdWithTeacher: async (req, res) => {
    const { id } = req.params;
    try {
      const workout = await WorkoutService.findById(id).populate("teacher");
      res.status(200).send(workout)
    } catch (err) {
      res.status(404).send({ message: 'Workout not found', err });
    }
  },
  findByIdAndUpdate: async (req, res) => {
    if (req.files) {
      const { photo } = req.files;
      console.log('🌞', photo);
      const upload = await utils.uploadFile(photo.tempFilePath);
      if (upload) req.body.image = upload.url;
    }
    const { id } = req.params;
    const { body } = req;
    try {
      const workout = await WorkoutService.findById(id);
      const updatedWorkout = await WorkoutService.update(workout, body);
      res.status(200).send(updatedWorkout)
    } catch (err) {
      res.status(404).send({ message: 'Workout not found', err });
    }
  },
  findByIdAndDelete: async (req, res) => {
    const { id } = req.params;
    try {
      const workout = await WorkoutService.findById(id);
      await WorkoutService.update(workout, { is_active: false });
      res.status(204).send();
    } catch (err) {
      res.status(404).send({ message: 'Error deleting workout', err });
    }
  },
  addWorkoutToUser: async (req, res) => {
    const { id }  = req.params;
    const { idWorkout } = req.body;
    try {
      const user = await UserService.findById(id);
      const workout = await WorkoutService.findById(idWorkout);
      if (!workout) res.status(404).send({ message: 'Workout not found' });
      const userHasWorkout = await UserService.findWorkout(user, workout);
      if (userHasWorkout) res.status(200).send({ message: 'User has this Workout already' });
      const userWithWorkout = await UserService.addWorkout(user, workout);
      res.status(201).send(userWithWorkout.populate('workouts'));
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'Error adding workout to user', err }); 
    }
  },
  findUserWorkouts: async (req, res) => {
    const { id }  = req.params;
    try {
      const user = await UserService.findById(id).populate('workouts');
      res.status(200).send(user.workouts);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'Error getting user roles', err }); 
    }
  },
  findUserWorkoutById: async (req, res) => {
    const { idUser, idWorkout }  = req.params;
    try {
      const user = await UserService.findById(idUser);
      const workout = await WorkoutService.findById(idWorkout);
      if (!workout) return res.status(404).send({ message: 'Workout not found' });
      const userWorkout = await UserService.findWorkout(user, workout);
      if (userWorkout) res.status(200).send({ message: 'User has this workout', workout: userWorkout });
      res.status(404).send({ message: 'Workout in User not found' });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'Error getting user workout', err }); 
    }
  },
  deleteUserWorkoutById: async (req, res) => {
    const { idUser, idWorkout }  = req.params;
    try {
      const user = await UserService.findById(idUser);
      const workout = await WorkoutService.findById(idWorkout);
      if (!workout) return res.status(404).send({ message: 'Workout not found' });
      const userHasWorkout = await UserService.findWorkout(user, workout);
      if (!userHasWorkout) res.status(404).send({ message: 'User is not reading this workout' });
      await UserService.deleteWorkout(user, workout);
      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: 'Error deleting user workout', err }); 
    }
  },
}
