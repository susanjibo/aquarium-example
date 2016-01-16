/**
 * Created by andrew on 6/9/15.
 */

import Vector2 from '../ui/vector2';
import SimplePhysicsModel from '../game/simple-physics-model';

class Fish {
    constructor(id, mc, mc_class, x, y) {
        this.id = id;
        this.mc = mc;
        this.mcClass = mc_class;

        this.physics = new SimplePhysicsModel();
        this.physics.friction = new Vector2(0.98, 0.98);
        this.scale = new Vector2(1, 1);
        this.setPosition(x, y);

        console.log(`Fish: constructor: ${this.mc} -> ${this.id}: ${this.mcClass}, ${this.physics.x}, ${this.physics.y}`);

        this.mc.callback = this.timelineCallback.bind(this);
        //this.mc.gotoAndPlay("fast");
        this.mc.gotoAndStop(0);

        this.onMouseDownHandler = this.onMouseDown.bind(this);
        this.onPressUpHandler = this.onPressUp.bind(this);

        this.mc.addEventListener("mousedown", this.onMouseDownHandler);
        this.mc.addEventListener("pressup", this.onPressUpHandler);
    }

    setPosition(x, y) {
        this.physics.position = new Vector2(x, y);
        // x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY)

        this.mc.setTransform(x, y, this.scale.x, this.scale.y, 0, 0, 0, 0, 0);
    }

    timelineCallback(mc, label) {
        //console.log(`Fish: timeline calback:`, mc, label);
        switch (label) {
            case "idling-end":
            case "slow-end":
            case "fast-end":
            case "back-end":
                this.mc.gotoAndPlay('idling');
        }
    }

    update(frame_time, total_time) {
        //console.log(`Fish: update: ${frame_time}`);
        if (!this.mc.dragging) {
            this.physics.update(frame_time);
            this.wrap();
            this.mc.setTransform(this.physics.x, this.physics.y, this.scale.x, this.scale.y, 0, 0, 0, 0, 0);
        }
    }
    
    wrap() {
        if (this.physics.position.x < -220) {
            this.physics.position.x = 1280 + 36; // MAGIC NUMBER
        }

        if (this.physics.position.x > 1500) {
            this.physics.position.x = -36; // MAGIC NUMBER
        }
    }

    setColorTransform(aOffset, aScale, rOffset, rScale, gOffset, gScale, bOffset, bScale) {
        //"use strict";
        //let ct = new flwebgl.geom.ColorTransform(aOffset, aScale, rOffset, rScale, gOffset, gScale, bOffset, bScale);
        //this.mc.setLocalColorTransform(ct);
    }

    onMouseDown() {
        console.log('Fish: mouseDown');
        this.mc.startDrag();
    }

    onPressUp() {
        console.log('Fish: pressUp');
        this.mc.stopDrag();
        this.setPosition(this.mc.x, this.mc.y);
        this.mc.gotoAndPlay("fast");
    }
}

export default Fish;
