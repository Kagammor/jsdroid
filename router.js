'use strict';

const javascript = require('./modules/javascript.js');
const ping = require('./modules/ping.js')
const join = require('./modules/join.js');
const part = require('./modules/part.js');
const info = require('./modules/info.js');
const blacklist = require('./modules/blacklist.js');

const router = {};

router.javascript = javascript;
router.js = router.javascript;

router.ping = ping;

router.join = join;
router.part = part;

router.blacklist = blacklist;

router.info = ''; // Include self in info module
router.info = info(Object.keys(router));

module.exports = function(method) {
    if(router[method]) {
        return router[method];
    }

    return function() {
        return Promise.resolve();
    };
};
