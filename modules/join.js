'use strict';

const config = require('config');

module.exports = function(args, target, from, client) {
    if(from === config.admin.owner) {
        client.join(args.join(' '));
    }

    return Promise.resolve();
};
