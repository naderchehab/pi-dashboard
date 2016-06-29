#!/usr/bin/env node

let express = require("express");
let app = express();
let bodyParser = require('body-parser');
let errorHandler = require('errorhandler');
let methodOverride = require('method-override');
let port = parseInt(process.env.PORT, 10) || 8080;
let publicDir = process.argv[2] || __dirname + '/public';
let path = require('path');
let passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
let exec = require('child_process').exec;

app.use(methodOverride());
app.use(bodyParser.json());
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

passport.use(new BasicStrategy(
    function(username, password, done) {
        let isValid = validatePassword(username, password);
        return done(null, isValid);
    }
));

app.use(passport.authenticate('basic', { session: false }));

app.use(express.static(publicDir));

function validatePassword(username, password) {
    return true;
}

app.get("/", function(req, res) {
    res.sendFile(path.join(publicDir, "/index.html"));
});

app.post('/on', function(req, res) {
    exec('/home/pi/rfoutlet/codesend 21811 -l 174', function(error, stdout, stderr) {
        if (error) {
            return res.json({
                success: false,
                error: error
            });
        }
        res.json({
            success: true,
            state: true
        });
    });
});

app.post('/off', function(req, res) {
    exec('/home/pi/rfoutlet/codesend 21820 -l 174', function(error, stdout, stderr) {
        if (error) {
            return res.json({
                success: false,
                error: error
            });
        }
        res.json({
            success: true,
            state: false
        });
    });
});

console.log("Dashboard server listening on port %s", port);
app.listen(port);
