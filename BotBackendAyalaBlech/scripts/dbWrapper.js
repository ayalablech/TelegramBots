
var MongoClient = require('mongodb').MongoClient;
const mongoDBConnection="mongodb://zencity_bots:bot123@ds145325.mlab.com:45325/datahack";
let dbWrapper = {};
const free="free";
const disengage ="engaged"
dbWrapper.getBotFromDB = function (botName, callback) {
  try {
    console.log('getBotFromDB')
    const dbName = 'datahack';
    MongoClient.connect(mongoDBConnection, function (err, client) {
      //Async function
      if (err) {
        console.log(err);
        callback('failed connect to DB', null);
        return;
      } //handling errors
      try {
        const db = client.db(dbName);
        getBots(db, function (err, bots) {
          console.log(`bots count: ${bots.length}`);
          if(bots.length==0){
            callback('cannot find bot '+ botName);
          }else{
          callback(null,bots[0]);
          }
        }, botName);
      }
      catch (err) {
        console.log(err);
        callback(err);
      }
    });
  }
  catch (err) {
    console.log(err);
    callback(err);
  }
}



dbWrapper.updateStatusBots = function (botName, isFree, callback) {
  try {
    console.log('updateStatusBots');
    console.log(`updateBots name :${botName} ,status :${isFree}`);
    const dbName = 'datahack';
    MongoClient.connect(mongoDBConnection, function (err, client) {
      //Async function
      if (err) {
        console.log(err);
        callback('failed connect to DB');
        return;
      } //handling errors
      try {
        const db = client.db(dbName);
        updateBot(db, function (err, result) {
          console.log(`result: ${result}`);
          callback(null);
        }, botName, isFree);
      }
      catch (err) {
        console.log(err);
        callback(err);
      }
    });
  }
  catch (err) {
    console.log(err);
    callback(err);
  }
}

const getBots = function (db, callback, botName) {
  const collection = db.collection('bots');
  collection.find({ "name": botName }, { "contactDetails": 0, "expertise": 0, "_id": 0 }).toArray(function (err, bots) {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    console.log("Found the following records");
    console.log(bots.length);
    console.log(bots);
    callback(null, bots);
  });
}

const updateBot = function (db, callback, botName, isFree) {

  console.log(`updateBots name :${botName} ,status :${isFree}`);
  // Get the documents collection
  const collection = db.collection('bots');
  collection.updateOne({ 'name': botName }
    , { $set: { 'status':isFree?free:disengage} }, function (err, result) {
      if (err) {
        callback(err, null);
      }
      console.log("Updated the document with the field name equal to status");
      callback(null, result);
    });
}

module.exports = dbWrapper;