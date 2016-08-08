const piblaster = require('pi-blaster.js');

function toggle(state, callback) {
  let angle = state ? 0.07 : 0.13;
  piblaster.setPwm(21, angle, () => {
      setTimeout(() => {
          piblaster.setPwm(21, 0, () => {
              callback();
          });
      }, 1000);
  });

  // utils.sendCommand('/var/www/pi-dashboard/rfoutlet/codesend 22275 -l 174', (err) => {
  //     if (err) {
  //         console.log(new Date(), 'Could not send command to lights', err);
  //         return callback(err);
  //     }
  // });
}

module.exports = {
    toggle
};
