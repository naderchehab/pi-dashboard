const exec = require('child_process').exec;
const auth = require('../secret.json');

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
    return auth.users.find(user => username === user.username && password === user.password) != null;
}

function hasPermission(username, action) {
    let user = auth.permissions[username];
    if (!user) {
        return false;
    }

    return user.indexOf(action) !== -1;
}

module.exports = {
    sendCommand,
    sendCommandNoWait,
    validatePassword,
    hasPermission
};
