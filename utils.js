const credentials = require('./secret.json');
const Gpio = require('onoff').Gpio;
const exec = require('child_process').exec;
const fs = require('fs');

const led = new Gpio(26, 'out'); // led is used for testing

const STATE_FILE = 'state.json';
const INDOOR_TEMPS_FILE = 'indoorTemps.json';

function validatePassword(username, password) {
    return username === credentials.username && password === credentials.password;
}

function sendCommand(command, device, turnOn, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return callback({
                success: false,
                error
            });
        }

        _saveState(device, turnOn, () => {
            let obj = {
                success: true,
            };
            obj[device] = turnOn;
            callback(obj);
        });
    });
}

function _saveState(device, turnOn, callback) {
    let obj = {};
    obj[device] = turnOn;
    fs.writeFile(STATE_FILE, JSON.stringify(obj), callback);
}

function getState(callback) {
    fs.readFile(STATE_FILE, 'utf-8', (err, data) => {
        callback(err, JSON.parse(data));
    })
}

function getIndoorTemps(callback) {
    fs.readFile(INDOOR_TEMPS_FILE, 'utf-8', (err, data) => {
        callback(err, JSON.parse(data).data);
    })
}

function toggleLights(lightsOn, res) {
    led.writeSync(lightsOn ? 1 : 0);
    _saveState("lights", lightsOn, () => {
        res.json({
            success: true,
            lightsOn
        });
    });
}

module.exports = {
    toggleLights,
    getState,
    getIndoorTemps,
    sendCommand,
    validatePassword
};
