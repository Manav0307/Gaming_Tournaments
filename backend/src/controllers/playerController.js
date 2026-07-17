const playerService = require('../services/playerService');
const ApiResponse = require('../utils/ApiResponse');

const createPlayer = async (req, res, next) => {
  try {
    const player = await playerService.createPlayer(req.body);
    res.status(201).json(new ApiResponse(201, player, 'Player created successfully'));
  } catch (error) {
    next(error);
  }
};

const getPlayers = async (req, res, next) => {
  try {
    const players = await playerService.getPlayers();
    res.status(200).json(new ApiResponse(200, players));
  } catch (error) {
    next(error);
  }
};

const getPlayer = async (req, res, next) => {
  try {
    const player = await playerService.getPlayerById(req.params.id);
    res.status(200).json(new ApiResponse(200, player));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayer,
};
