'use strict';

const js = require('./modules/javascript.js');
const ping = require('./modules/ping.js')
const join = require('./modules/join.js');
const part= require('./modules/part.js');

const modules = {};

modules.javascript = function(args, target, from) {
    return js(args.join(' '), target, from);
};

modules.js = modules.javascript;
modules.ping = ping;
modules.join = join;
modules.part = part;

module.exports = modules;
