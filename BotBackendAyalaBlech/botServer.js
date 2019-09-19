// Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 80;
const botBl = require('./scripts/bot.bl');
const availableBots = [
  { name: 'Ayala1Bot', apiToken: "928667979:AAEP8_CI8VoBNztgYIG4XEn-widGgC1_XZY" },
  { name: 'Ayala2Bot', apiToken: "973561188:AAEDTtwRztLAl-OF0h63FsvmYEav9SCnn6w" },
  { name: 'Ayala3Bot', apiToken: "731971563:AAGuof-_HrlvqYN-TlfUXcWOO-l3_HqQ1NM" }
]

// Configurations
app.use(bodyParser.json());

// Endpoints
app.post('/bot1', (req, res) => {
  console.log(req);
  recieveBotMessage(req.body, 0, res); });

app.post('/bot2', (req, res) => {
  console.log(req);
  recieveBotMessage(req.body, 1, res); });

app.post('/bot3', (req, res) => {
  console.log(req);
  recieveBotMessage(req.body,2, res); });
    

// Listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function recieveBotMessage(requestBody, botNumber, response) {
  if(requestBody&&requestBody.message&&requestBody.message.text&&requestBody.message.chat&&requestBody.message.chat.id){
  const message = requestBody.message.text;
  const chatId = requestBody.message.chat.id;
  console.log('recieve message from bot ' + botNumber + ":" + message+ JSON.stringify(requestBody.message));
  if(message!=null){
 botBl.treatMessage(message, botNumber, function (error, responseMessage) {
   console.log(`responseMessage: ${responseMessage} ${error} ${availableBots[botNumber]} ${availableBots.length}`);
   if(error==null&&availableBots.length>botNumber)
   botBl.sendMessage(availableBots[botNumber].apiToken,chatId,response,responseMessage);
});
}
}
}