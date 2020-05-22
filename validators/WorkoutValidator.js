const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      short_description: Joi.string().required(),
      long_description: Joi.string().required(),
      date: Joi.string().required(),
      hour: Joi.string().required(),
      cancellation_time: Joi.number().required(),
      image: Joi.string().required(),
    }),
  }),
  addWorkoutToUser: celebrate({
    [Segments.BODY]: Joi.object().keys({
      idWorkout: Joi.string().required(),
    }),
  }),
};

