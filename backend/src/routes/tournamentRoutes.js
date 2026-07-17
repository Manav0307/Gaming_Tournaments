const express = require('express');
const tournamentController = require('../controllers/tournamentController');
const validate = require('../middlewares/validate');
const Joi = require('joi');

const router = express.Router();

const createTournamentSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    maxPlayers: Joi.number().integer().min(1).required()
  })
};

const registerPlayerSchema = {
  body: Joi.object({
    playerId: Joi.string().required()
  })
};

const submitScoreSchema = {
  body: Joi.object({
    playerId: Joi.string().required(),
    score: Joi.number().min(0).required()
  })
};

router.post('/', validate(createTournamentSchema), tournamentController.createTournament);
router.get('/', tournamentController.getTournaments);
router.post('/:id/register', validate(registerPlayerSchema), tournamentController.registerPlayer);
router.post('/:id/score', validate(submitScoreSchema), tournamentController.submitScore);
router.get('/:id/leaderboard', tournamentController.getLeaderboard);
router.get('/:id/player/:playerId', tournamentController.getPlayerRank);

module.exports = router;
