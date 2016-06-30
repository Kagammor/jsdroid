'use strict';

const config = {};

config.prefix = '~';
config.suffix = '>';

config.owner = 'ThePendulum';

config.irc = {
    nick: 'jsdev',
    userName: 'jsdev',
    realName: 'jsdev',
    server: 'irc.freenode.net',
    port: 6697,
    secure: true,
    channels: ['#web-sandbox']
};

config.truncate = 400;
config.ellipsis = '…';

module.exports = config;
