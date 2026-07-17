const { Tournament, Registration, Score, Player } = require('../models/model');
const ApiError = require('../utils/ApiError');

const createTournament = async (tournamentBody) => {
  return Tournament.create(tournamentBody);
};

const getTournaments = async () => {
  return Tournament.find();
};

const registerPlayer = async (tournamentId, playerId) => {
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new ApiError(404, 'Tournament not found');
  }

  const player = await Player.findById(playerId);
  if (!player) {
    throw new ApiError(404, 'Player not found');
  }

  const existingRegistration = await Registration.findOne({ tournamentId, playerId });
  if (existingRegistration) {
    throw new ApiError(400, 'Duplicate registration');
  }

  const registeredCount = await Registration.countDocuments({ tournamentId });
  if (registeredCount >= tournament.maxPlayers) {
    throw new ApiError(400, 'Tournament full');
  }

  return Registration.create({ tournamentId, playerId });
};

const submitScore = async (tournamentId, playerId, score) => {
  if (score < 0) {
    throw new ApiError(400, 'Invalid score');
  }

  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    throw new ApiError(404, 'Tournament not found');
  }

  const player = await Player.findById(playerId);
  if (!player) {
    throw new ApiError(404, 'Player not found');
  }

  const isRegistered = await Registration.findOne({ tournamentId, playerId });
  if (!isRegistered) {
    throw new ApiError(400, 'Player not registered');
  }

  let existingScore = await Score.findOne({ tournamentId, playerId });
  if (existingScore) {
    existingScore.score = score;
    await existingScore.save();
    return existingScore;
  }

  return Score.create({ tournamentId, playerId, score });
};

const getLeaderboard = async (tournamentId) => {
  const scores = await Score.find({ tournamentId })
    .sort({ score: -1 })
    .populate('playerId', 'name email country');
  return scores;
};

const getPlayerRank = async (tournamentId, playerId) => {
  const leaderboard = await getLeaderboard(tournamentId);
  const index = leaderboard.findIndex(s => s.playerId._id.toString() === playerId.toString());
  
  if (index === -1) {
    throw new ApiError(404, 'Player not found in leaderboard');
  }

  return {
    rank: index + 1,
    score: leaderboard[index].score
  };
};

module.exports = {
  createTournament,
  getTournaments,
  registerPlayer,
  submitScore,
  getLeaderboard,
  getPlayerRank,
};
