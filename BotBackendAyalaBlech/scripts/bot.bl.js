let botBl = {};
const dbWrapper = require('./dbWrapper');
const url = 'https://api.telegram.org/bot';
const axios = require('axios');
const availableBots = [
    { name: 'Ayala1Bot', apiToken: "928667979:AAEP8_CI8VoBNztgYIG4XEn-widGgC1_XZY" },
    { name: 'Ayala2Bot', apiToken: "973561188:AAEDTtwRztLAl-OF0h63FsvmYEav9SCnn6w" },
    { name: 'Ayala3Bot', apiToken: "731971563:AAGuof-_HrlvqYN-TlfUXcWOO-l3_HqQ1NM" }
]

botBl.treatMessage = function (sentMessage, botNumber, callback) {
   let currentBot = availableBots[botNumber];
    console.log("treatMessage for " + currentBot);
    var responseMessage = "";
    switch (sentMessage) {
        case "/start":
            start(currentBot,callback,responseMessage);
            break;
        case "/engage":
            engage(currentBot,callback,responseMessage);
            break;
        case "/disengage":
            disengage(currentBot,callback,responseMessage);
            break;
        case "/askforhelp":
            askforhelpWithoutTopic(callback,responseMessage);
            break;
        default:
            if (sentMessage.match(/askforhelp/gi)) {
                askforhelp(currentBot,callback, sentMessage,responseMessage);
            }
            else {
                responseMessage = "Unrecognized command. Say what?";
                callback(null,responseMessage);
                break;
            }
    }
}
function askforhelpWithoutTopic(callback,responseMessage) {
    responseMessage = "you should write topic! Unrecognized command. Say what?";
    callback(null,responseMessage);
}
function start(currentBot,callback,responseMessage) {
    let availableTopics;
    responseMessage = `Welcome to your Customer Support Bot!
    Engage with me by typing '/engage'.
    Disengage with me by typing '/disengage'.
    Ask for help by typing '/askforhelp [topic]'.
    Available topic: 
    `
    switch (currentBot.name) {
        case 'Ayala1Bot':
            availableTopics = 'products,telephons';
            break;
        case 'Ayala2Bot':
            availableTopics = 'English, Hebrew';
            break;
        case 'Ayala3Bot':
            availableTopics = 'ECG,Cardiology';
            break;
    }
    responseMessage += availableTopics;
    callback(null,responseMessage);
}

function askforhelp(currentBot,callback, sentMessage,responseMessage) {
    dbWrapper.getBotFromDB(currentBot.name, function (err, bot) {
        if (err) {
            callback(err);
        } else {
            responseMessage = `${sentMessage} - ${bot.answer}`;
            callback(null,responseMessage);
        }
    });
}

function disengage(currentBot, callback,responseMessage) {
    dbWrapper.updateStatusBots(currentBot.name, true, function (err, message) {
        console.log(`${message}`);
        responseMessage = `Disengaging bot:${currentBot.name}- Disengaged!`
        callback(null,responseMessage);
    });
}
function engage(currentBot,callback,responseMessage) {
    dbWrapper.getBotFromDB(currentBot.name, function (err, bot) {
        if (err) {
            callback(err);
        }
        else if (bot.status == "engaged") {
            responseMessage = `Bot ${currentBot.name} was already enaged`;
            callback(null,responseMessage);
        }
        else {
            responseMessage = `Try enage....`;
            callback(null,responseMessage);
            dbWrapper.updateStatusBots(currentBot.name, false, function (err) {
                if (err) {
                    responseMessage = `Failed to engage bot: ${err}`;
                } else {
                    responseMessage = `successful to engage bot`;
                }
                callback(null,responseMessage);
            });
        }
    });
}


botBl.sendMessage= function(apiTokenBot,currentChatId,response,responseMessage) {
    console.log('return message to bot: ' );
    axios.post(`${url}${apiTokenBot}/sendMessage`,
        {
            chat_id: currentChatId,
            text: `${responseMessage}`
        }) .then((res) => { 
                      response.status(200).send(res);
                     }).catch((error) => {
                      response.send(error);
                     });
}
module.exports = botBl;
