const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const playerRoutes = require('./routes/playerRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/tournaments', tournamentRoutes);

app.use(errorHandler);

module.exports = app;
