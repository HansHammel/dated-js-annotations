'use strict';

var expect = require('chai').expect;
var BombDetector = require('../lib/scheduler.js');
var bombDetector = new BombDetector('test/fixtures/*.js', {});

//noinspection NodeModulesDependencies
describe('Scheduler', function () {
    it('should detect all timers', function (done) {
        var timers = bombDetector.timers.get();
        //noinspection JSUnresolvedVariable
        expect(timers.length).to.equal(7);
        done();
    });
    it('should detect all bombs', function (done) {
        var bombs = bombDetector.timers.bombs();
        //noinspection JSUnresolvedVariable
        expect(bombs.length).to.equal(2);
        done();
    });
});

