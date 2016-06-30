'use strict';

const Docker = require('dockerode');
const docker = new Docker();

const {Writable} = require('stream');

module.exports = function(code, target, from) {
    const ws = Writable();
    const results = [];

    return new Promise((resolve, reject) => {
        ws._write = function(chunk, enc, next) {
            results.push(chunk.toString());

            next();
        };

        ws.on('finish', () => {
            const result = JSON.parse(results[0]);

            try {
                if(typeof result.value === 'undefined' && result.console.length) {
                    resolve(`${from}: (console) ${result.console.join(', ')}`);
                } else if(result.console.length) {
                    resolve(`${from}: (${result.type}) ${result.value || result.error} | (console) ${result.console.join(', ')}`);
                } else {
                    resolve(`${from}: (${result.type}) ${result.value || result.error}`);
                }
            } catch(error) {
                reject(`Evaluation error: ${error.message}`);
            }
        });

        const options = {
            Env: [`CODE=${code}`, `ME=${from}`],
        }

        docker.run('jsdroid-node', [], ws, options, options, (error, data, container) => {
            if(error) {
                reject(error);
            }

            container.remove((error, data) => {
                if(error) {
                    console.log(error);
                }
            });
        });
    });
}
