var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const mongoDBConnection="mongodb://zencity_bots:bot123@ds145325.mlab.com:45325/datahack";
const bot1="Ayala1Bot";
const bot2="Ayala2Bot";
const bot3="Ayala3Bot";

router.get('/statusBots', function (req, res, next) {
  try {
    console.log('statusbots')
    const dbName = 'datahack';
    MongoClient.connect(mongoDBConnection, function (err, client) {
      //Async function
      if (err) { console.log(err); 
      res.status(500).send('failed connect to DB');
      return;
      } //handling errors
      try {
        const db = client.db(dbName);
        getBots(db, function (err, bots) {
          console.log(`bots count: ${bots.length}`);
          res.send(bots);
        });
      }
      catch (err) {
        console.log(err);
        res.send(err);
      }
    });
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
});

const getBots = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('bots');
  // Find some documents
  collection.find({
    "$or": [{
      "name": bot1
    }, {
      "name": bot2
    }, {
      "name": bot3
    }]
  },{  name:1,status:1,_id:0}).toArray(function (err, bots) {
    if (err) {
      callback(err, null);
    }
    console.log("Found the following records:");
    console.log(bots)
    callback(null, bots);
  });
}

module.exports = router;

