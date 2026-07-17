const express = require('express');
const playerController = require('../controllers/playerController');
const validate = require('../middlewares/validate');
const Joi = require('joi');

const router = express.Router();

const createPlayerSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    country: Joi.string().required()
  })
};

router.post('/', validate(createPlayerSchema), playerController.createPlayer);
router.get('/', playerController.getPlayers);
router.get('/:id', playerController.getPlayer);

module.exports = router;
