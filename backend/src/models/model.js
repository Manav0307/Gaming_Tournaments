const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  password: { type: String, required: true }
});

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  maxPlayers: { type: Number, required: true },
  date: { type: Date, required: true }
});

const registrationSchema = new mongoose.Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }
});

const scoreSchema = new mongoose.Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  score: { type: Number, required: true }
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Player: mongoose.model("Player", playerSchema),
  Tournament: mongoose.model("Tournament", tournamentSchema),
  Registration: mongoose.model("Registration", registrationSchema),
  Score: mongoose.model("Score", scoreSchema)
};
