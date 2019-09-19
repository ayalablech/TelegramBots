console.log('start of botservice');

const dbService = require('../db/db.service');
const config = require('../../config/environment');


const treatMessage = async (sentMessage, botName) => {
    console.log("treatMessage for " + botName);
    switch (sentMessage) {
        case "/start":
            return start(botName);
        case "/engage":
            return engage(botName);
        case "/disengage":
            return disengage(botName);
        case "/askforhelp":
            return "you should write topic! Unrecognized command. Say what?";
        default:
            if (sentMessage.match(/askforhelp/gi)) {
                return askforhelp(botName);
            }
            else {
                return "Unrecognized command. Say what?";
            }
    }
}

async function start(botName) {
    console.log('start command..');
    let availableTopics;
    responseMessage = `Welcome to your Customer Support Bot!
     Engage with me by typing '/engage'.
     Disengage with me by typing '/disengage'.
     Ask for help by typing '/askforhelp [topic]'.
     Available topic: 
     `
    switch (botName) {
        case 'customersupbot1':
            availableTopics = 'connectivity, troubleshooting';
            break;
        case 'customersupbot2':
            availableTopics = 'services, privacy';
            break;
        case 'customersupbot3':
            availableTopics = 'hardware, firmware';
            break;
    }
    responseMessage += availableTopics;
    return responseMessage;
}

async function askforhelp(botName) {
    console.log('askforhelp command..');
    const bot = await dbService.getBot(botName);
    console.log(`askforhelp command..${bot.status}`);

    if (bot.status === config.ENGAGE_STATUS) {
        return `Bot ${botName} enaged ! try again later...`;
    }
    else {
        return bot.answer;
    }
}

async function engage(botName) {
    console.log('engage command..');
    const bot = await dbService.getBot(botName);
    if (bot.status === config.ENGAGE_STATUS) {
        return `Bot ${botName} was already enaged`;
    }
    else {
       let d= await dbService.updateBotStatus(botName, false);
        return `successful to engage bot`;
    }
}

async function disengage(botName) {
    console.log('disengage command..');
    let d=  await dbService.updateBotStatus(botName, true);
    return `Disengaging bot: ${botName}- Disengaged!`;
}


module.exports = {
    treatMessage
}