'use strict';
const dbService = require('../db/db.service');

const GetBotsStatus = async (req, res) => {
    const result = await dbService.GetBotsStatus();
    console.log(result);
    res.send(result);
}

module.exports = {
    GetBotsStatus
};