'use strict';

const config = require('config');

module.exports = function(user, channel, client) {
    if(user === config.admin.owner) {
        return Promise.resolve();
    }

    if(config.admin.opAuthorized) {
        return new Promise((resolve,reject) => {
            client.whois(user, info => {
                const isInChannel = info.channels.find(inChannel => {
                    return channel.match(channel);
                });

                if(isInChannel) {
                    // Check for OP flag
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

    return Promise.reject();
};
