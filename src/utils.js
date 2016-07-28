const exec = require('child_process').exec;
const credentials = require('../secret.json');

function sendCommand(command, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return callback(error);
        }

        callback(null, stdout);
    });
}

function sendCommandNoWait(command, callback) {
    exec(command);
    callback();
}

function validatePassword(username, password) {
    return username === credentials.username && password === credentials.password;
}

module.exports = {
    sendCommand,
    sendCommandNoWait,
    validatePassword
};
