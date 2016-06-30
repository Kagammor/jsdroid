'use strict';

const config = require('config');
const isAuthorized = require('../isAuthorized.js');

module.exports = function(args, target, from, client) {
    const parts = args.map(arg => {
        return isAuthorized(from, arg, client).then(() => {
            client.part(arg);
        });
    });

    return Promise.all(parts);
};
