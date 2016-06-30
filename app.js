'use strict';

const config = require('config');

const irc = require('irc');
const client = new irc.Client(config.irc.server, config.irc.nick, config.irc);

const router = require('./router.js');

const sanitize = require('./sanitize.js');

client.addListener('message', (from, to, message) => {
    const target = to === config.irc.nick ? from : to;

    const chunks = message.split(' ');
    const command = chunks[0];
    const args = chunks.slice(1);

    let method;

    if(command.match(new RegExp(`^\\${config.prefix}\\w+`))) {
        method = command.slice(config.prefix.length);
    }

    if(command.match(new RegExp(`^\\w+\\${config.suffix}`))) {
        method = command.slice(0, -config.suffix.length);
    }

    if(router[method]) {
        router[method](args, target, from, client).then(result => {
            if(result) {
                client.say(target, sanitize(result));
            }
        }).catch(error => {
            if(error) {
                client.say(target, sanitize(error));
            }
        });
    }
});

client.addListener('error', error => {
    console.log(error);
});
