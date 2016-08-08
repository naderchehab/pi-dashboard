const Gpio = require('onoff').Gpio;
const fs = require('fs');
const path = require('path');
const db = require('./db');
const motionSensor = require('./motionSensor');
const powerOutlet = require('./powerOutlet');
const lights = require('./lights');
const webcam = require('./webcam');
const utils = require('./utils');

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
    switch (device) {
        case 'motionSensor':
            if (state) {
                motionSensor.start();
            } else {
                motionSensor.stop();
            }
            insertState();
            break;
        case 'lights':
                lights.toggle(state, () => {
                    console.log(new Date(), 'Command sent to lights', state);
                    insertState();
                });
            break;
        case 'powerOutlet':
            powerOutlet.toggle(state, () => {
                console.log(new Date(), 'Command sent to power outlet', state);
                insertState();
            });
            break;
        case 'webcam':
            webcam.toggle(state, () => {
                console.log(new Date(), 'Command sent to webcam', state);
                insertState();
            });
        break;
    default:
    callback(new Error('Invalid device type'));
}

function insertState() {
    db.insert(device, {
        state
    }, (err) => {
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
