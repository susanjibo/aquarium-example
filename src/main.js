"use strict";

let jibo = require ('jibo');
let Status = jibo.bt.Status;
let factory = jibo.bt.factory;


function start() {
    let root = factory.create('../behaviors/17-make-reservations');
    root.start();
    let intervalId = setInterval(() => {
        if (root.status !== Status.IN_PROGRESS) {
            clearInterval(intervalId);
            console.log('Behavior tree finished with status ' + root.status);
        }
        else {
            root.update();
        }
    }, 33);
}

jibo.init(() => {
    //we need to require any custom behaviors so that they can register themselves
    //with the behavior factory.
    require('./behaviors/center-robot');
    require('./behaviors/succeed-on-touch');
    require('./behaviors/fail-on-touch');
    //setup code for displaying Jibo's eye.
    let eyeElement = document.getElementById('eye');
    jibo.visualize.createRobotRenderer(eyeElement, jibo.visualize.DisplayType.EYE);
    start();
});
