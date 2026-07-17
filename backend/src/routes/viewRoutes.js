const express = require('express');
const { Tournament, Registration, Player } = require('../models/model');
const router = express.Router();

// Route to render the tournament page with specific tournament data
router.get('/tournament/:id', async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).send('Tournament not found');
    }

    const registeredCount = await Registration.countDocuments({ tournamentId: tournament._id });
    const totalPlayersCount = await Player.countDocuments({});
    
    // Fetch 4 random players for the leaderboard placeholders
    const randomPlayers = await Player.aggregate([{ $sample: { size: 4 } }]);

    // Renders frontend/tournament.ejs
    res.render('tournament', { 
      tournament, 
      registeredCount, 
      totalPlayersCount, 
      randomPlayers 
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
