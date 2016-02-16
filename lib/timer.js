/*
 @timer 2016-10-02
 TODO: nothing
 */
function Timer(file, date) {
    this.file = file;
    this.date = date;
    this.isBomb = false;
    this.updateIsBomb();
}

// @timer 2016-10-01 TODO: misc
Timer.prototype.updateIsBomb = function() {
    if (this.date <= new Date()) {
        this.isBomb = true;
    }
};

// @timer 2016-01-01 TODO: misc
module.exports = Timer;