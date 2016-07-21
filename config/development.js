'use strict';

const config = {};

config.prefix = '~';
config.suffix = '>';

config.admin = {
    owner: 'ThePendulum',
    opAuthorized: true
};

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
config.paste = {
    url: 'http://sprunge.us',
    method: 'POST',
    form: {
        sprunge: ''
    }
};

config.db = {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'SheLivedToBe#86',
        database: 'jsdroid'
    }
};

module.exports = config;
