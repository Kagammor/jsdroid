'use strict';

module.exports = function(msg, target, from) {
    return Promise.resolve(`${from}: Pong!`);
};
