'use strict';

const js = require('./modules/javascript.js');
const ping = require('./modules/ping.js')

const modules = {};

modules.javascript = function(args, target, from) {
    return js(args.join(' '), target, from);
};

modules.js = modules.javascript;
modules.ping = ping;

module.exports = modules;
