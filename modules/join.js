'use strict';

'use strict';

const config = require('config');

module.exports = function(args, target, from, client) {
    if(from === config.owner) {
        client.join(args.join(' '));
    }

    return Promise.resolve();
};
