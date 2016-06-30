'use strict';

const config = require('config');

module.exports = function(user, channel, client) {
    if(user === config.owner) {
        return Promise.resolve();
    } else {
        return new Promise((resolve,reject) => {
            client.whois(user, info => {
                const isInChannel = info.channels.find(inChannel => {
                    return channel.match(channel);
                });

                if(isInChannel) {
                    const isOp = isInChannel.slice(0, 1) === '@';

                    if(isOp) {
                        resolve();
                    } else {
                        reject();
                    }
                }
            });
        });
    }
};
