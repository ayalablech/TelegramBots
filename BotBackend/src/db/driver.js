'use strict';

console.log('start of driver');

const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/environment');
let db;
const initDB = async () => {
  console.log('initialize DB driver.....');

  if (db) {
    console.warn('Trying to init DB again!');
  }
  const mongoDBConnection = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_NAME}`;
  const client = await MongoClient.connect(mongoDBConnection)
    .catch(err => console.log(err));
  db = client.db(config.DB_NAME);
  console.log('DB is connected: ' + db);
  return db;
}


const getDB = () => {
  return db;
}


module.exports = {
  getDB: getDB,
  initDB
};