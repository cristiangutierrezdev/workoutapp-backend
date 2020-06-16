const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const { rolesSchema } = require('./Roles');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  policy: {
    type: Boolean,
    required: true
  },
  phone_number: Number,
  born_date: String,
  profile_img: String,
  is_member: {
    type: Boolean,
    default: false,
  },
  member_workouts: {
    type: Number,
    default: 0,
  },
  my_list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
  },
  workouts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  roles: [rolesSchema],
}, {timestamps: true});

userSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
