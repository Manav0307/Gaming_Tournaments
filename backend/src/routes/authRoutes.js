const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const Joi = require('joi');

const router = express.Router();

const signupSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    country: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match'
    })
  })
};
//whenever a request is made to /api/auth/signup, it will be validated 
//using the signupSchema and then passed to the authController.signup function
const assignRandomCountry = (req, res, next) => {
  if (!req.body.country) {
    const countries = ['USA', 'UK', 'Brazil', 'Japan', 'Germany', 'France', 'India', 'Canada', 'Australia', 'South Korea'];
    req.body.country = countries[Math.floor(Math.random() * countries.length)];
  }
  next();
};

router.post('/signup', assignRandomCountry, validate(signupSchema), authController.signup);

module.exports = router;
