'use strict';

const config = require('config');
const note = require('note-log');
const util = require('util');

const isAuthorized = require('../isAuthorized.js');

const knex = require('../knex.js');

module.exports = function(args, target, from, client) {
    const username = args[0];
    const reason = args.slice(1).join(' ');

    return isAuthorized(from, target, client).then(() => {
        return new Promise((resolve, reject) => {
            client.whois(username, whois => {
                resolve(whois);
            });
        });
    }).then(whois => {
        if(whois.host) {
            return knex('blacklist').where({
                username,
                host: whois.host
            }).then(result => {
                if(result.length) {
                    if(result[0].reason) {
                        return `${username} is already blacklisted for '${result[0].reason}'.`;
                    }

                    return `${username} is already blacklisted.`;
                }

                return knex('blacklist').insert({
                    username,
                    host: whois.host,
                    reason
                }).then(result => `${username} is blacklisted.`);
            });
        }

        return 'User cannot be found.';
    });
};
