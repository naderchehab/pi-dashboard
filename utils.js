let credentials = require('./secret.json');
let Gpio = require('onoff').Gpio;
let led = new Gpio(26, 'out'); // led is used for testing
let exec = require('child_process').exec;
let fs = require('fs');

const STATE_FILE = 'state.json';

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
    sendCommand,
    validatePassword
};
