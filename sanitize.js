'use strict';

const config = require('config');
const request = require('request-promise');

module.exports = function(str) {
    let newStr = str.replace(/\n|\r/g, '');

    if(newStr.length > config.truncate) {
        return request({
            url: 'http://sprunge.us',
            method: 'POST',
            form: {
                sprunge: str
            }
        }).then(res => {
            return `${newStr.slice(0, config.truncate - config.ellipsis.length - res.length)} ${config.ellipsis} ${res}`;
        }).catch(error => {
            console.log(error);

            return 'Sanitation error';
        });
    } else {
        return Promise.resolve(newStr);
    }
};
