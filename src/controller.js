const Gpio = require('onoff').Gpio;
const fs = require('fs');
const path = require('path');
const db = require('./db');
const motionSensor = require('./motionSensor');
const utils = require('./utils');
//const led = new Gpio(26, 'out'); // led is used for testing

db.init((err) => {
    if (err) {
        return console.log(new Date(), 'Unable to intialize database', err);
    }

    getState('motionSensor', (err, docs) => {
        if (err) {
            return console.log(new Date(), 'Unable to get state', err);
        }

        if (docs[0] && docs[0].state === true) {
            toggle('motionSensor', true, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    });
});

function toggle(device, state, callback) {
    switch(device) {
        case 'motionSensor':
            if (state) {
                motionSensor.start();
            }
            else {
                motionSensor.stop();
            }
            insertState();
            break;
        case 'powerOutlet':
            let code = state ? '21811' : '21820';
            utils.sendCommand('/var/www/pi-dashboard/rfoutlet/codesend ' + code  + ' -l 174', (err) => {
                if (err) {
                    console.log(new Date(), 'Could not send command to power outlet', err);
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
