const later = require('later');
const db = require('./db');
const utils = require('./utils');

db.init();

function init() {
    let scheduleText = 'every 10 minutes starting on the 0th minute';
    let parsedScheduleText = later.parse.text(scheduleText);
    let schedule = later.schedule(parsedScheduleText);
    let interval = later.setInterval(_recordCurrentTemperature, parsedScheduleText);
    let nextRun = schedule.next(1);
    console.log('Temperature sensor will run', scheduleText);
    console.log('Next run time:', nextRun);
}

function _recordCurrentTemperature(callback) {
    console.log(new Date(), "Reading temperature sensor...");
    utils.sendCommand('sudo /var/www/pi-dashboard/Adafruit_Python_DHT/examples/AdafruitDHT.py 2302 4', (err, result) => {
        if (err) {
            console.log('Could not send command to read current temperature');
            return callback(err);
        }
        let arr = result.split("* ");
        let temperature = parseFloat(arr[0].split('=')[1], 10);
        let humidity = parseFloat(arr[1].split('=')[1], 10);
        db.insert('temperature', {temperature, humidity}, callback);
    });
}

module.exports = {
    init
};
