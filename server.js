#!/usr/bin/env node

let express = require('express');
let fs = require('fs');
let app = express();
let bodyParser = require('body-parser');
let errorHandler = require('errorhandler');
let methodOverride = require('method-override');
let port = parseInt(process.env.PORT, 10) || 8080;
let publicDir = __dirname + '/client/public';
let path = require('path');
let passport = require('passport');
let BasicStrategy = require('passport-http').BasicStrategy;
let utils = require('./utils');

app.use(methodOverride());
app.use(bodyParser.json());
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

passport.use(new BasicStrategy((username, password, done) => {
        let isValid = utils.validatePassword(username, password);
        return done(null, isValid);
    }
));

app.use(passport.authenticate('basic', { session: false }));
app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, '/dist/index.html'));
});

app.get('/getState', (req, res) => {
    utils.getState((err, data) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, powerOn: data.powerOn});
    });
});

app.post('/on', (req, res) => {
    utils.sendCommand('/var/www/pi-dashboard/rfoutlet/codesend 21811 -l 174', true, (result) => res.json(result));
    //utils.toggleLed(true, res);
});

app.post('/off', (req, res) => {
    utils.sendCommand('/var/www/pi-dashboard/rfoutlet/codesend 21820 -l 174', false, (result) => res.json(result));
    //utils.toggleLed(false, res);
});

app.get('/getFiles', (req, res) => {
    fs.readdir(path.join(publicDir, '/files'), (err, files) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, files});
    })
});

console.log('Dashboard server listening on port %s', port);
app.listen(port);
