"use strict";

let jibo = require('jibo');
let Status = jibo.bt.Status;
let createDecorator = jibo.bt.createDecorator;
let factory = jibo.bt.factory;
let SucceedOnTouch = require('./succeed-on-touch');

module.exports = createDecorator({
    constructor: function(onTouch) {
        this.decorator = SucceedOnTouch(onTouch);
    },
    start: function() {
        return this.decorator.start();
    },
    stop: function() {
        this.decorator.stop();
    },
    update: function(result) {
        let status = this.decorator.update(result);
        if(status === Status.SUCCEEDED) {
            return Status.FAILED;
        }
        return status;
    }
});

factory.addBehavior(module, "project");
