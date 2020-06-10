const { UserService } = require('../services');
const utils = require('../utils');

module.exports = {
  me: async(req, res) => {
   const { id } = req.decoded.data;
    try {
      const user = await UserService.findById(id);
      res.status(200).send(user);
    } catch (err) {
      res.status(404).send({ message: 'User not found', err });
    }
  },
  create: async (req, res) => {
    try {
      const user = await UserService.create(req.body);
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send({ message: 'Error creating user', err });
    }
  },
  find: async (req, res) => {
    try {
      const users = await UserService.find();
      res.status(200).send(users);
    } catch (err) {
      res.status(404).send({ message: 'Users not found', err });
    }
  },
  findAll: async (req, res) => {
    try {
      const users = await UserService.findAll();
      res.status(200).send(users);
    } catch (err) {
      res.status(404).send({ message: 'Users not found', err });
    }
  },
  findById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.findById(id);
      res.status(200).send(user);
    } catch (err) {
      res.status(404).send({ message: 'User not found', err });
    }
  },
  findByIdAndUpdate: async (req, res) => {
    if (req.files) {
      const { photo } = req.files;
      console.log('🌞', photo);
      const upload = await utils.uploadFile(photo.tempFilePath);
      if (upload) req.body.profile_img = upload.url;
    }
    const { id } = req.params;
    const { body } = req;
    try {
      const user = await UserService.findById(id);
      const updatedUser = await UserService.update(user, body);
      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(404).send({ message: 'User not found', err });
    }
  },
  findByIdAndDelete: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.findById(id);
      await UserService.update(user, { is_active: false });
      res.status(204).send({ message: 'User deleted' });
    } catch (err) {
      res.status(404).send({ message: 'Error deleting user', err });
    }
  },
  signup: async (req, res) => {
    try {
      const user = await UserService.create(req.body);
      res.status(201).send({ message: 'signup succesfull', user });
    } catch (err) {
      res.status(400).send({ message: 'Error signin up', err });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.findByEmail(email);
      if (!user) res.status(404).send({ message: 'User not found' });
      const isMatch = UserService.comparePasswords(password, user.password);
      if (!isMatch) res.status(400).send({ message: 'Invalid credentials' });
      const accessToken = utils.createToken({
        id: user._id,
        name: user.first_name,
        email: user.email,
      });
      res.status(200).send({ user, accessToken });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Error on login', error });
    }
  },
};
