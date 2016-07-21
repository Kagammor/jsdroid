'use strict';

const config = {};

config.prefix = '~';
config.suffix = '>';

config.admin = {
    owner: 'BestIRCUser',
    opAuthorized: true
};

config.irc = {
    nick: 'jsdemo',
    userName: 'jsdemo',
    realName: 'jsdemo',
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
        password: 'verysecretpassword',
        database: 'jsdemo'
    }
};

module.exports = config;
