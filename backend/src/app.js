const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const playerRoutes = require('./routes/playerRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const authRoutes = require('./routes/authRoutes');
const viewRoutes = require('./routes/viewRoutes');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, '../../frontend'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../frontend')));

app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/view', viewRoutes);

app.use(errorHandler);

module.exports = app;
