#!/usr/bin/env node

let express = require('express');
let fs = require('fs');
let app = express();
let compression = require('compression');
let bodyParser = require('body-parser');
let errorHandler = require('errorhandler');
let methodOverride = require('method-override');
let port = parseInt(process.env.PORT, 10) || 8080;
let publicDir = __dirname + '/client/public';
let path = require('path');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let ensureLogin = require('connect-ensure-login');
let utils = require('./utils');

app.use(methodOverride());
app.use(bodyParser.json());

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));
app.use(compression());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
        let isValid = utils.validatePassword(username, password);
        if (isValid) {
            return done(null, {username, password});
        }
        else {
            return done(null, false, "Invalid credentials");
        }
    }
));

app.use(express.static(publicDir));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, '/dist/index.html'));
});

app.get('/isLoggedIn', (req, res) => {
    return res.json({success: true, isLoggedIn: req.user != null});
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (user) {
        req.login(user, err => {
            if (err) {
                return next(err);
            }
            return res.json({success: true, isLoggedIn: true});
        });
    }
    else {
        return res.json({success: true, isLoggedIn: false});
    }
    })(req, res, next);
});

app.get('/getState', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    utils.getState((err, data) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, powerOn: data.powerOn});
    });
});

app.get('/getIndoorTemps', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    utils.getIndoorTemps((err, data) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, indoorTemps: data});
    });
});

app.post('/on', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    utils.sendCommand('/var/www/pi-dashboard/rfoutlet/codesend 21811 -l 174', true, (result) => res.json(result));
    //utils.toggleLed(true, res);
});

app.post('/off', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    utils.sendCommand('/var/www/pi-dashboard/rfoutlet/codesend 21820 -l 174', false, (result) => res.json(result));
    //utils.toggleLed(false, res);
});

app.get('/getFiles', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    fs.readdir(path.join(publicDir, '/files'), (err, files) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, files});
    })
});

console.log('Dashboard server listening on port %s', port);
app.listen(port);
