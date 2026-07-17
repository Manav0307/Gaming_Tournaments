const { Player, User } = require('../models/model');
const ApiError = require('../utils/ApiError');

const signup = async (userData) => {
  const existingUser = await User.findOne({
    $or: [
      { email: userData.email },
      { username: userData.username }
    ]
  });

  if (existingUser) {
    throw new ApiError(400, 'Username or Email already taken');
  }

  //saving password directly as plaintext without hashing
  const newUser = User.create(userData);
  const playerData = {
    name: userData.username,
    email: userData.email,
    country: userData.country
  };

  const newPlayer = Player.create(playerData);
  return { user: newUser, player: newPlayer };

};

module.exports = {
  signup,
};
