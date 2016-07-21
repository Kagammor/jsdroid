'use strict';

const config = require('config');
const note = require('note-log');

const irc = require('irc');
const client = new irc.Client(config.irc.server, config.irc.nick, config.irc);

const router = require('./router.js');
const sanitize = require('./sanitize.js');

const knex = require('./knex.js');

client.addListener('message', (from, to, message) => {
    const target = to === config.irc.nick ? from : to;

    const chunks = message.split(' ');
    const command = chunks[0];
    const args = chunks.slice(1);

    note(`${to} <${from}> ${message}`);

    let method;

    if(command.match(new RegExp(`^\\${config.prefix}\\w+`))) {
        method = command.slice(config.prefix.length);
    }

    if(command.match(new RegExp(`^\\w+\\${config.suffix}`))) {
        method = command.slice(0, -config.suffix.length);
    }

    if(method) {
        new Promise((resolve, reject) => {
            client.whois(from, whois => {
                resolve(whois);
            });
        }).then(whois => {
            return knex('blacklist').where({
                host: whois.host
            })
        }).then(result => {
            if(result.length && from !== config.admin.owner) {
                client.say(from, `I'm sorry, you are blacklisted because '${result[0].reason}'. Please contact ${config.admin.owner} to dispute this decision.`);
            } else {
                return router(method)(args, target, from, client).then(result => {
                    if(result) {
                        return sanitize(result).then(sanitizedResult => {
                            client.say(target, sanitizedResult);
                        });
                    }
                });
            }
        }).catch(error => {
            note(error);

            client.say(target, `Oops, something went horribly wrong! Please report this incident to ${config.admin.owner}.`);
        });
    }
});

client.addListener('error', error => {
    console.log(error);
});
