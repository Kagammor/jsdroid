'use strict';

const config = require('config');

module.exports = function(str) {
    let newStr = str.replace(/\n|\r/g, '');

    if(newStr.length > config.truncate - config.ellipsis.length) {
        return newStr.slice(0, config.truncate - config.ellipsis.length) + config.ellipsis;
    } else {
        return newStr;
    }
};
