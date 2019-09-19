const config = {
    DB_HOST: 'ds145325.mlab.com:45325',
    DB_NAME: 'datahack',
    DB_USER: 'zencity_bots',
    DB_PASSWORD: 'bot123',
    BOTS_LIST: null,
    FREE_STATUS:'free',
    ENGAGE_STATUS:'engaged'
};
var botsArray = [['419831156:AAGGe0b1pu7l1nMXKr9FIsMCFN16T9Jy-9g', 'customersupbot1'],
['429977475:AAGJ_nd4kWvLkQrX8Nvb3IQ-wyxOH5GovqY', 'customersupbot2'],
['432976860:AAE_51EwJhuVAVweSRuhEUuQnN2dVcnTvKE', 'customersupbot3'],
];
config.BOTS_LIST = new Map(botsArray);

module.exports = config;