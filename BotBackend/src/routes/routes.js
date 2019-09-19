'use strict';

const express = require('express');
const router = express.Router();
const botStatusesController = require('../controllers/bots.statuses.controller');

router.get('/statusBots', botStatusesController.GetBotsStatus);

module.exports = router;