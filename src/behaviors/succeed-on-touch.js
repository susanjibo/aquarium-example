"use strict";

let jibo = require('jibo');
let Status = jibo.bt.Status;
let createDecorator = jibo.bt.createDecorator;
let factory = jibo.bt.factory;

module.exports = createDecorator({
    constructor: function(onTouch) {
        this.onTouch = onTouch;
        this.status = Status.INVALID;
        this.onClickBind =this.onClick.bind(this);
    },
    start: function() {
        this.status = Status.IN_PROGRESS;
        document.addEventListener('onclick', this.onClickBind)
        return true;
    },
    stop: function() {
        //cleanup if this decorator is stopped
        document.removeEventListener('onclick', this.onClickBind)
    },
    update: function(result) {
        if(this.status === Status.SUCCEEDED) {
            return Status.SUCCEEDED;
        }
        return result;
    }
});

factory.addBehavior(module, "project");
