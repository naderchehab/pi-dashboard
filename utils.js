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

function sendCommand(command, powerOn, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return callback({
                success: false,
                error
            });
        }

        _saveState(powerOn, () => {
            callback({
                success: true,
                powerOn
            });
        });
    });
}

function _saveState(powerOn, callback) {
    fs.writeFile(STATE_FILE, JSON.stringify({powerOn}), callback);
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

function toggleLed(powerOn, res) {
    led.writeSync(powerOn ? 1 : 0);
    _saveState(powerOn, () => {
        res.json({
            success: true,
            powerOn
        });
    });
}

module.exports = {
    toggleLed,
    getState,
    getIndoorTemps,
    sendCommand,
    validatePassword
};
