const path = require('path');
const later = require('later');
const findRemoveSync = require('find-remove');

const dataDir = '../cam_data';

function init() {
    let scheduleText = 'every day';
    let parsedScheduleText = later.parse.text(scheduleText);
    let schedule = later.schedule(parsedScheduleText);
    let interval = later.setInterval(_cleanup, parsedScheduleText);
    let nextRun = schedule.next(1);
    console.log('Image cleanup job will run', scheduleText);
    console.log('Next run time:', nextRun);
}

function _cleanup() {
  const dir = path.resolve(__dirname, dataDir);
  findRemoveSync(dir, {age: {seconds: 432000, extensions: '.jpg'}});
}

module.exports = {
    init
};
