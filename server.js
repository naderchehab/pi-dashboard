#!/usr/bin/env node

var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 80,
    publicDir = process.argv[2] || __dirname + '/public',
    path = require('path'),
    exec = require('child_process').exec;

    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(express.static(publicDir));
    app.use(errorHandler({
      dumpExceptions: true,
      showStack: true
    }));


app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

app.post('/on', function(req, res) {
    exec('/home/pi/rfoutlet/codesend 21811 -l 174', function(error, stdout, stderr) {
        if (error) {
            return res.json({success: false, error: error});
        }
        res.json({success: true, state: true});
    });
});

app.post('/off', function(req, res) {
    exec('/home/pi/rfoutlet/codesend 21820 -l 174', function(error, stdout, stderr) {
        if (error) {
            return res.json({success: false, error: error});
        }
        res.json({success: true, state: false});
    });
});

console.log("Dashboard server listening on port %s", port);
app.listen(port);
