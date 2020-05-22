const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone_number: Joi.number().required(),
      password: Joi.string(),
      born_date: Joi.string().required(),
    }),
  }),
};

