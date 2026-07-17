const Joi = require('joi');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const object = Object.keys(schema).reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      acc[key] = req[key];
    }
    return acc;
  }, {});

  const { value, error } = Joi.compile(schema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
