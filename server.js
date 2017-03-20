#!/usr/bin/env node

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const port = parseInt(process.env.PORT, 10) || 8080;
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ensureLogin = require('connect-ensure-login');
const controller = require('./src/controller');
const tempReadScheduler = require('./src/tempReadScheduler');
const securityCamScheduler = require('./src/securityCamScheduler');
const cleanupScheduler = require('./src/cleanupScheduler');
const utils = require('./src/utils');
const publicDir = __dirname + '/client/public';

tempReadScheduler.init();
securityCamScheduler.init();
cleanupScheduler.init();

app.use(methodOverride());
app.use(bodyParser.json());

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session({ cookie: { maxAge : 183*24*60*60*1000 } }));

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

app.get('/getState/:device', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    let device = req.params.device;
    controller.getState(device, (err, docs) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, docs});
    });
});

app.post('/toggle/:device/:state', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    let device = req.params.device;
    let state = req.params.state === 'on';

    if (utils.hasPermission(req.user.username, device) === false) {
        return res.json({success: false, error: "Permission denied"});
    }

    controller.toggle(device, state, err => {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, state});
    });
});

app.get('/getTemperature', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    controller.getState('temperature', (err, data) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, temperature: data});
    });
});

app.get('/getFiles', ensureLogin.ensureLoggedIn('/'), (req, res) => {
    controller.getFiles(publicDir, (err, files) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, files});
    });
});

console.log('%s Dashboard server listening on port %s', new Date(), port);
app.listen(port);
