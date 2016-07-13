'use strict';

const note = require('note-log');

const config = require('config');
const request = require('request-promise');

const paste = config.paste;

module.exports = function(str) {
    let newStr = str.replace(/\n|\r/g, '');

    if(newStr.length > config.truncate) {
        Object.keys(paste.form).forEach(key => {
            paste.form[key] = str;
        });

        return request(paste).then(res => {
            return `${newStr.slice(0, config.truncate - config.ellipsis.length - res.length)} ${config.ellipsis} ${res}`;
        }).catch(error => {
            note(error);

            return 'Sanitation error';
        });
    } else {
        return Promise.resolve(newStr);
    }
};
