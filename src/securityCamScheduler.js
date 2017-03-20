const fs = require('fs');
const path = require('path');
const http = require('http');
const later = require('later');
const moment = require('moment');
const secret = require('../secret.json');

const camHostname = '192.168.0.109';
const camDataDir = '../cam_data';

function init() {
    let scheduleText = 'every 1 second';
    let parsedScheduleText = later.parse.text(scheduleText);
    let schedule = later.schedule(parsedScheduleText);
    let interval = later.setInterval(_recordCamFrame, parsedScheduleText);
    let nextRun = schedule.next(1);
    console.log('Security cam save job will run', scheduleText);
    console.log('Next run time:', nextRun);
}

function download(filename, callback) {
  const file = fs.createWriteStream(filename);
  const options = {
    host: camHostname,
    path: '/tmpfs/auto.jpg',
    headers: {
      'Authorization': `Basic ${secret.securityCamAuthToken}`
    }
  };
  const request = http.get(options, (response) => {
    response.pipe(file);
  });
}

function _recordCamFrame() {
  const dateTime = moment().format('YYYY_MM_DD_HH_mm_ss_S');
  const filename = `${dateTime}.jpg`;
  const p = path.resolve(__dirname, camDataDir, filename);
  download(p);
}

module.exports = {
    init
};
