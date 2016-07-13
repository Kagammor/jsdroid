'use strict';

const note = require('note-log');

const Docker = require('dockerode');
const docker = new Docker();

const {Writable} = require('stream');

module.exports = function(args, target, from) {
    const ws = Writable();
    const results = [];

    const code = args.join(' ');

    return new Promise((resolve, reject) => {
        ws._write = function(chunk, enc, next) {
            results.push(chunk.toString());

            next();
        };

        const options = {
            Env: [`CODE=${code}`, `ME=${from}`, `TARGET=${target}`],
            NetworkDisabled: true,
            Memory: 134217728
        }

        docker.run('jsdroid-node', [], ws, options, options, (error, data, container) => {
            if(error) {
                reject(error);
            }

            container.remove((error, data) => {
                if(error) {
                    note(error);
                }
            });
        });

        ws.on('finish', () => {
            try {
                const result = JSON.parse(results.join(''));

                if(result.type === 'undefined' && result.console.length) {
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
    });
}
