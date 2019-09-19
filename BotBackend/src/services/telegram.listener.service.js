
console.log('start of telegram listener');

const botService = require('./bots.service');
const TelegramBot = require('node-telegram-bot-api');
const config = require('../../config/environment');


const init = async () => {
    console.log('initialize Telegram Bots service.....');

    for (var [apiToken, name] of config.BOTS_LIST.entries()) {
        console.log(`start listenning on bot ${name}`);
        startBotListener(apiToken,name);
      }



}

function startBotListener(apiToken,botName) {
    const bot = new TelegramBot(apiToken, { polling: true });
    // Matches "/echo [whatever]"
    bot.onText(/\/echo (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message
        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"
        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, resp);
    });

    // Listen for any kind of message. There are different kinds of
    // messages.
    bot.on('message', async (msg) => {
        console.log(`recieve message from ${botName}: ${msg.text}`);
        const responseMessage = await botService.treatMessage(msg.text,botName);
        console.log("response: "+responseMessage);
      //  treatMessage(text, botName, function (error, responseMessage) {
        //    if (error === null) {
                bot.sendMessage(msg.chat.id, responseMessage);
         //   }
      //  });
        // send a message to the chat acknowledging receipt of their message
    });
}

module.exports = {
    init
}