const authService = require('../services/authService');
const ApiResponse = require('../utils/ApiResponse');

const signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    // Don't send back the password in real scenarios, but returning whole user here for simplicity
    res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
