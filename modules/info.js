'use strict';

const config = require('config');
const me = require('../package.json');

module.exports = function(modules) {
    return function(args, target, from, client) {
        return Promise.resolve(`I'm ${me.name} v${me.version}. My owner is ${config.admin.owner} (${me.author}). Bugs can be reported at ${me.bugs.url}. Available commands: ${modules.join(', ')}`);
    }
};
