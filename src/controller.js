const Gpio = require('onoff').Gpio;
const fs = require('fs');
const path = require('path');
const db = require('./db');
const utils = require('./utils');

const led = new Gpio(26, 'out'); // led is used for testing

db.init();

function toggle(device, state, callback) {
    switch(device) {
        case 'lights':
            led.writeSync(state ? 1 : 0);
            insertState();
            break;
        case 'powerOutlet':
            let code = state ? '21811' : '21820';
            utils.sendCommand('/var/www/pi-dashboard/rfoutlet/codesend ' + code  + ' -l 174', (err) => {
                if (err) {
                    console.log('Could not send command to power outlet');
                    return callback(err);
                }
                insertState();
            });
            break;
            default:
                callback(new Error('Invalid device type'));
    }

    function insertState() {
        db.insert(device, {state}, (err) => {
            callback(err);
        });
    }
}

function getState(collectionName, callback) {
    db.find(collectionName, callback);
}

function getFiles(publicDir, callback) {
    fs.readdir(path.join(publicDir, '/files'), callback);
}

module.exports = {
    toggle,
    getState,
    getFiles
};
