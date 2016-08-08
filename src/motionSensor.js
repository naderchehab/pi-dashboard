const Gpio = require('onoff').Gpio;
const motionSensor = new Gpio(5, 'in', 'both');
const utils = require('./utils');
const lights = require('./lights');

function start() {
    console.log(new Date(), 'Starting motion sensor...');
    motionSensor.watch(_motionSensorHandler);
}

function stop() {
    console.log(new Date(), 'Stopping motion sensor...');
    motionSensor.unwatch();
}

function _motionSensorHandler(err, value) {
  if (err) {
    throw err;
  }

  if (value === 1) {
      lights.toggle(true, () => {
          console.log(new Date(), 'Motion detected turning lights on');
          console.log(new Date(), 'Starting webcam recording...');
          utils.sendCommand('ffmpeg -vcodec mjpeg -s 320x240 -r 15 -i /dev/video0 -f alsa -ac 1 -i hw:1 -t 300 "output_`date +%Y-%m-%d.%Hh%Mm%Ss`.avi"', (err) => {
              if (err) {
                  return console.log(new Date(), 'Could not start recording. Device probably busy.');
              }
              console.log(new Date(), 'Webcam recording stopped.');
              lights.toggle(false, () => {
                  console.log(new Date(), 'Turning lights off');
                  insertState();
              });
          });
      });
  }
}

module.exports = {
    start,
    stop
};
