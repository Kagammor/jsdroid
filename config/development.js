'use strict';

const config = {};

config.prefix = '~';
config.suffix = '>';

config.irc = {
    nick: 'jsdroid',
    userName: 'jsdroid',
    realName: 'jsdroid',
    server: 'irc.freenode.net',
    port: 6697,
    secure: true,
    channels: ['#web-sandbox']
};

config.truncate = 400;
config.ellipsis = '…';

module.exports = config;
