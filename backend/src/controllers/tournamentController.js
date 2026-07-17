const tournamentService = require('../services/tournamentService');
const ApiResponse = require('../utils/ApiResponse');

const createTournament = async (req, res, next) => {
  try {
    const tournament = await tournamentService.createTournament(req.body);
    res.status(201).json(new ApiResponse(201, tournament, 'Tournament created successfully'));
  } catch (error) {
    next(error);
  }
};

const getTournaments = async (req, res, next) => {
  try {
    const tournaments = await tournamentService.getTournaments();
    res.status(200).json(new ApiResponse(200, tournaments));
  } catch (error) {
    next(error);
  }
};

const registerPlayer = async (req, res, next) => {
  try {
    const { id: tournamentId } = req.params;
    const { playerId } = req.body;
    const registration = await tournamentService.registerPlayer(tournamentId, playerId);
    res.status(201).json(new ApiResponse(201, registration, 'Player registered successfully'));
  } catch (error) {
    next(error);
  }
};

const submitScore = async (req, res, next) => {
  try {
    const { id: tournamentId } = req.params;
    const { playerId, score } = req.body;
    const newScore = await tournamentService.submitScore(tournamentId, playerId, score);
    res.status(200).json(new ApiResponse(200, newScore, 'Score submitted successfully'));
  } catch (error) {
    next(error);
  }
};

const getLeaderboard = async (req, res, next) => {
  try {
    const { id: tournamentId } = req.params;
    const leaderboard = await tournamentService.getLeaderboard(tournamentId);
    res.status(200).json(new ApiResponse(200, leaderboard));
  } catch (error) {
    next(error);
  }
};

const getPlayerRank = async (req, res, next) => {
  try {
    const { id: tournamentId, playerId } = req.params;
    const rankData = await tournamentService.getPlayerRank(tournamentId, playerId);
    res.status(200).json(new ApiResponse(200, rankData));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTournament,
  getTournaments,
  registerPlayer,
  submitScore,
  getLeaderboard,
  getPlayerRank,
};
