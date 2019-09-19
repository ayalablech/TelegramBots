'use strict';
const config = require('../../config/environment');
const dbDriver = require('./driver');
const db = dbDriver.getDB();
console.log('dbservice dbdriver:' + db);


const getBot = async (botName) => {
  const collection = db.collection('bots');
  return await collection.findOne({ "name": botName }, { "contactDetails": 0, "expertise": 0, "_id": 0 });
}

const GetBotsStatus = async () => {
  const collection = db.collection('bots');
  let query = [];
  for (var name of config.BOTS_LIST.values()) {
    query.push({
      "name": name
    })
  }
  return await collection.find({
    "$or": query
  }, { name: 1, status: 1, _id: 0 }).toArray();
}


const updateBotStatus = async (botName, isFree) => {
  const collection = db.collection('bots');
  return await collection.updateOne({ 'name': botName }
    , { $set: { 'status': isFree ? config.FREE_STATUS : config.ENGAGE_STATUS } });
}


module.exports = {
  getBot,
  updateBotStatus,
  GetBotsStatus
};