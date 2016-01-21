import jibo from 'jibo';
import path from 'path';
import GuiManager from './mim/debug-gui-manager';
import MimManager from './mim/mim-manager';
import EventManager from './ui/event-manager';
import PixijsUtils from './ui/pixijs-utils';
import Vector2 from './ui/vector2';
import SimplePhysicsModel from './game/simple-physics-model';
import AquariumManager from './aquarium/aquarium-manager';
import Fish from './aquarium/fish';

let {Status, factory} = jibo.bt;

let root = null;

let blackboard = {};
let notepad = {};

let lastMouseX = 0;
let lastMouseY = 0;

let pixiRenderer;
let pixiStage;

let elapsedTime = 0;
let currentTime = new Date().getTime();
let prevTime = currentTime;

function start() {
    console.log(`START`);
    root = factory.create('../behaviors/main', {
        blackboard: blackboard,
        notepad: notepad
    });
    console.log(`START POST ROOT: `,root);
    root.start();
    window.requestAnimationFrame(update);
}

function update() {
    if (root.status !== Status.IN_PROGRESS) {
        console.log(`BehaviorTree Exited with status: ${root.status}`);
    } else {
        root.update();
        if (pixiRenderer && pixiStage) {
            pixiRenderer.render(pixiStage);
        }
        if (AquariumManager.initialized) {
            currentTime = new Date().getTime();
            elapsedTime = currentTime - prevTime;
            prevTime = currentTime;
            AquariumManager.enterFrameUpdateHandler(elapsedTime, 0);
        }

        window.requestAnimationFrame(update);
    }
}

function setup() {
    console.log(`SETUP`);
    require('./behaviors/debug-behavior');
    require('./behaviors/behavior-behavior');
    require('./behaviors/mim');
    require('./behaviors/mim-gui');
    let eyeElement = document.getElementById('eye');
    jibo.visualize.createRobotRenderer(eyeElement, jibo.visualize.DisplayType.EYE);

    //blackboard.Vector2 = Vector2;
    //blackboard.SimplePhysicsModel = SimplePhysicsModel;
    blackboard.AquariumManager = AquariumManager;
    blackboard.Fish = Fish;

    // SETUP PIXIJS

    pixiRenderer = new PIXI.autoDetectRenderer(1280, 720, {
        view: document.getElementById("canvas"),
        backgroundColor: 0x0033CC, // Jibo Blue: 0x00a9e0, Darker Blue: 0x0033CC
        antialias: true
    });

    // Don't prevent default
    pixiRenderer.plugins.interaction.autoPreventDefault = false;

    // Root display object
    pixiStage = new PIXI.Container();
    EventManager.init(pixiStage);
    AquariumManager.init(pixiStage);
    setupEvents();

    let aquariumAtlasJSON = require('../pixijs-spritesheets/aquarium_pixijs_atlas_.json');
    pixiflash.SpriteSheet.fromData(aquariumAtlasJSON, function()
    {
        console.log(`PixiJS SpriteSheet Loaded`);
        start();
    });

}

console.log(`CALLING jibo.init`);
jibo.init(setup);

/*
jibo.init().then(() => {




}).catch(e => {
    console.error(e);
});

 */

function setupEvents() {
    console.log(`Adding Mouse Events`);
    document.onmousedown = mouseDown;
    document.onmouseup = mouseUp;
    document.onmousemove = mouseMove;
}

//// GLOBAL EVENTS

function mouseDown(e) {
    //console.log(`mouseDown: ${e.pageX}, ${e.pageY}`);
    if (e && EventManager) {
        EventManager.onMouseDown(e.target, "mousedown", e.pageX, e.pageY);
        lastMouseX = e.pageX;
        lastMouseY = e.pageY;
    }
}

function mouseUp(e) {
    //console.log(`mouseUp (pressup): ${e.pageX}, ${e.pageY}`);
    if (e && EventManager) {
        EventManager.onMouseUp(e.target, "pressup", e.pageX || lastMouseX, e.pageY || lastMouseY);
    }
}

function mouseMove(e) {
    //console.log(`mouseMove (pressmove):`);
    if (e && EventManager) {
        EventManager.onMouseMove(e.target, "pressmove", e.pageX, e.pageY);
        lastMouseX = e.pageX;
        lastMouseY = e.pageY;
    }
}
