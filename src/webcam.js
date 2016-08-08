const utils = require('./utils');

function toggle(state, callback) {
    let command = state ? 'sudo motion' : 'sudo pkill motion';
    utils.sendCommandNoWait(command, () => {
        callback();
    });
}

module.exports = {
    toggle
};
