var acorn = require('acorn');
var Timers = require('./timers');
var fs = require('fs');
var os = require('os');

var existsSync = function (filename) {
    try {
        fs.accessSync(filename);
        return true;
    } catch (ex) {
        return false;
    }
};

var exists = function (filename, cb) {
    fs.access(filename, cb);
    // or if want exactly the same old API:
    //fs.access(function(err) { cb(err ? false : true); });
};
var glob = require("glob");


function Schedule(filesorglob, globoptions) {
    if (!(this instanceof Schedule))
        return new Schedule(filesorglob, globoptions);
    else {
        this.key = '@timer';
        this.testRegExp = new RegExp(this.key + '\\s', 'i');
        this.dateRegExp = new RegExp(this.key + '\\s+(\\d{4}-\\d{2}-\\d{2})', 'i');
        this.timers = new Timers();
        this.parse(filesorglob, globoptions);
    }
};

Schedule.prototype.parse = function (filesorglob, globoptions) {
    var that = this;
    var files = glob.sync(filesorglob, globoptions);
    var comments = [], options = {};
    files.forEach(function (file) {
        if (!existsSync(file)) {
            console.warn('Source file "' + file + '" not found.');
            return false;
        }
        else {
            comments = options.onComment = [];
            acorn.parse(fs.readFileSync(file, {encoding: 'utf8'}), options);
            //console.log(comments.length > 0 ? comments.reduce(function(p, c, i, a) { return c.value; }) : '');
            that.parseComments(file, comments);
        }
    });
};

Schedule.prototype.parseComments = function (filepath, comments) {
var t = [];
    comments.forEach(function (comment) {
        if (this.isTimer(comment)) {
            t.push(comment.value);
            this.timers.add(filepath, this.getDateFromTimer(comment));
        }
    }, this);
    if (t.length > 0) { console.log(filepath); console.log(t.join(os.EOL)); console.log(os.EOL);}
};

Schedule.prototype.isTimer = function (comment) {
    return this.testRegExp.test(comment.value);
};

Schedule.prototype.getDateFromTimer = function (timer) {
    var result = this.dateRegExp.exec(timer.value);
    return (result !== null) ? new Date(result[1]) : false;
};


module.exports = Schedule;