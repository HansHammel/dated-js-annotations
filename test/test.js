'use strict';

var expect = require('chai').expect;
var BombDetector = require('../lib/index.js');
var bombDetector = new BombDetector('test/fixtures/*.js', {});

describe('Schedule', function () {
    it('should detect all timers', function (done) {
        var timers = bombDetector.timers.get();
        expect(timers.length).to.equal(7);
        done();
    });
    it('should detect all bombs', function (done) {
        var bombs = bombDetector.timers.bombs();
        expect(bombs.length).to.equal(2);
        done();
    });
});

