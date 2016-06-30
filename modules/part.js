'use strict';

const config = require('config');

module.exports = function(args, target, from, client) {
    return new Promise((resolve, reject) => {
        if(from === config.owner) {
            args.forEach(arg => {
                client.part(arg);
            });

            resolve();
        } else {
            client.whois(from, info => {
                args.forEach(arg => {
                    const inChannel = info.channels.find(channel => {
                        return channel.match(arg);
                    });

                    if(inChannel) {
                        const isOp = inChannel.slice(0, 1) === '@';

                        if(isOp) {
                            client.part(arg);
                        }
                    }
                });

                resolve();
            });
        }
    });
};
