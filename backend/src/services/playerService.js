const { Player } = require('../models/model');
const ApiError = require('../utils/ApiError');

const createPlayer = async (playerBody) => {
  if (await Player.findOne({ email: playerBody.email })) {
    throw new ApiError(400, 'Email already taken');
  }
  return Player.create(playerBody);
};

const getPlayers = async () => {
  return Player.find();
};

const getPlayerById = async (id) => {
  const player = await Player.findById(id);
  if (!player) {
    throw new ApiError(404, 'Player not found');
  }
  return player;
};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayerById,
};
