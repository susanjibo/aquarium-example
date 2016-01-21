//// EXECUTE SCRIPT

() => {
    if (!notepad.initialized) {
        notepad.initialized = true;
        console.log(`blackboard.AquariumManager: ${blackboard.AquariumManager != undefined}`);

        if (blackboard.AquariumManager) {
            blackboard.AquariumManager.addFish("fish_1");
            let fish_2 = blackboard.AquariumManager.addFish("fish_2");
            fish_2.setColorTransform(0, 1, 50, 1, -100, 1, -50, 1);
            fish_2.setPosition(350, 400);

            blackboard.fish_1 = blackboard.AquariumManager.getFishWithId("fish_1");
            blackboard.fish_2 = blackboard.AquariumManager.getFishWithId("fish_2");
        }
    }
}

//// SOYN

() => {
    self.counter = 10;
    return {data: 'data'};
}

(data) =>  {
    self.counter--;
    if (self.counter > 0) {
        console.log(`SucceedOnYouNameIt: counter: ${self.counter}`);
        return {status:"IN_PROGRESS"};
    } else {
        return {status:"SUCCEEDED"};
    }
}

//// SOYN 2

() => {
    let AquariumManager = require('../src/modules/aquarium-manager');
    console.log('SetupButton');
    let sgf = player3d.getScenegraphFactory();
    let mc = sgf.createMovieClipInstance("FishListItemMC");

    self.button_mc = new blackboard.FlwebglMcWrapper(mc, 0, 0);
    self.button_mc.x = 20;
    self.button_mc.y = 552;
    self.stop = false;

    player3d.getStage().addChild(self.button_mc.mc);

    self.onPressUpHandler = (e) => {
        console.log(`onPressUpHandler`);
        let food = AquariumManager.addFood(640, 0);
        food.physics.velocity.set(0, 12);
        self.stop = true;
    };

    self.button_mc.addEventListener('pressup', self.onPressUpHandler);

    return {data: 'data'};
}

(data) =>  {
    if (self.stop) {
        self.button_mc.removeEventListener('pressup', self.onPressUpHandler);
        player3d.getStage().removeChild(self.button_mc.mc);
        //stage.removeChild(self.button_mc);
        //stage.update();
        return {status:"SUCCEEDED"};
    } else {
        //stage.update();
        return {status:"IN_PROGRESS"};
    }
}

//// BB Fish 1
() => {
    return {data: 'data'};
}

(elapsedTime, data) =>  {

    let now = new Date().getTime();
    if (!self.startTime) {
        self.startTime = now;
    }

    if ((now - self.startTime) > 2000) {
        self.startTime = now;

        if (blackboard.fish_1) {
            blackboard.fish_1.physics.velocity.x = -200;
            blackboard.fish_1.gotoAndPlay("fast");
        }
    }
    return {status:"IN_PROGRESS"}
}

// BB Fish 2

() => {
    return {data: 'data'};
}

(elapsedTime, data) =>  {

    let now = new Date().getTime();
    if (!self.startTime) {
        self.startTime = now;
    }

    if ((now - self.startTime) > 2200) {
        self.startTime = now;

        if (blackboard.fish_2) {
            blackboard.fish_2.physics.velocity.x = -180;
            blackboard.fish_2.gotoAndPlay("fast");
        }
    }
    return {status:"IN_PROGRESS"}
}

//// Blackboard

import {TouchList, TouchListItem, FlwebglMcWrapper, FlwebglEventManager} from "jibo-ui";
import {Vector2, SimplePhysicsModel} from 'jibo-game';
import Fish from '../modules/fish';
import AquariumManager from '../modules/aquarium-manager';

import FishTouchListDelegate from '../modules/fish-touch-list-delegate';

console.log(`pre-populating blackboard`);

export default {FlwebglEventManager:FlwebglEventManager, FlwebglMcWrapper:FlwebglMcWrapper, Fish:Fish, AquariumManager:AquariumManager, FishTouchListDelegate:FishTouchListDelegate};


//// DebugBehavior

import jibo from 'jibo';
let {Status, createBehavior, factory} = jibo.bt;

module.exports = createBehavior({
    constructor(text) {
        this.text = text;
        this.status = Status.INVALID;
    },
    start() {
        this.status = Status.SUCCEEDED;
        console.log(this.text);
        return true;
    },
    stop() {

    },
    update() {
        return this.status;
    }
});

factory.addBehavior(module);
