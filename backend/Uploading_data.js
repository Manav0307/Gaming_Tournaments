const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const { faker } = require("@faker-js/faker");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));

const { Player, User } = require("./src/models/model");
 
const generatePassword = () => {
  const letters = faker.string.alpha({ length: 5 }); // 5 random letters
  const numbers = faker.string.numeric({ length: 4 }); // 4 random digits
  return letters + numbers;
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Fetch existing players
    const players = await Player.find({});
    console.log(`Found ${players.length} players`);

    // Clear existing users (optional)
    await User.deleteMany({});
    console.log("Cleared existing users");

    // Build user docs from players
    const usersData = players.map((player) => ({
      username: player.name,
      email: player.email,
      country: player.country,
      password: generatePassword()
    }));

    const users = await User.insertMany(usersData);
    console.log(`Inserted ${users.length} users`);

    await mongoose.disconnect();
    console.log("Seeding users complete");
    process.exit(0);
  } catch (err) {
    console.error("Seeding users failed:", err);
    process.exit(1);
  }
};

seedUsers();