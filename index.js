'use strict';
var BombDetector = require('./lib/scheduler.js');

 var init = function() {
        var bd = new BombDetector('lib/**/*.js', {});
        var timers = bd.timers.get();
        var bombs = bd.timers.bombs();
        if (timers.length === 0) {
            if (!module.parent) console.log('No timers found.');
        } else if (timers.length > 0 && bombs.length === 0) {
            if (!module.parent) console.log('No exploded time bombs found.');
        } else if (bombs.length > 0) {
            if (!module.parent) console.error('Exploded time bomb found in file: ' + bombs[0].file);
        }
};

//TODO: make model
if (!module.parent) { init(); }
    else module.exports = init;