const utils = require('./utils');

function toggle(state, callback) {
    let code = state ? '21811' : '21820';
    utils.sendCommand('/var/www/pi-dashboard/rfoutlet/codesend ' + code + ' -l 174', (err) => {
        if (err) {
            console.log(new Date(), 'Could not send command to power outlet', err);
            return callback(err);
        }
        callback();
    });
}

module.exports = {
    toggle
};
