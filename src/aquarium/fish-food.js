/**
 * Created by andrew on 6/9/15.
 */

import Vector2 from '../ui/vector2';
import SimplePhysicsModel from '../game/simple-physics-model';

class FishFood {
    constructor(mc, mc_class, x, y) {
        this.mc = mc;
        this.mcClass = mc_class;

        this.physics = new SimplePhysicsModel();
        this.physics.friction = new Vector2(0.98, 1);
        this.scale = new Vector2(1, 1);
        this.setPosition(x, y);

        this.onMouseDownHandler = this.onMouseDown.bind(this);
        this.onPressUpHandler = this.onPressUp.bind(this);

        this.mc.addEventListener("mousedown", this.onMouseDownHandler);
        this.mc.addEventListener("pressup", this.onPressUpHandler);

        this.alive = true;

        this.randomVelocityFunction = this.randomVelocity.bind(this);

        this.intervalId = setInterval(this.randomVelocityFunction, 500);
    }

    setPosition(x, y) {
        this.physics.position = new Vector2(x, y);
        // x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY)

        this.mc.setTransform(x, y, this.scale.x, this.scale.y, 0, 0, 0, 0, 0);
    }

    update(frame_time, total_time) {

        if (!this.mc.dragging) {
            this.physics.force.set(0, 1);
            this.physics.update(frame_time);
            this.checkAlive();
            this.setPosition(this.physics.x, this.physics.y);
        }
    }

    randomVelocity() {
        this.physics.velocity.x = 20 - Math.random() * 40;
    }

    checkAlive() {
        if (this.physics.position.y > 720) { // MAGIC NUMBER
            this.alive = false;
            clearInterval(this.intervalId);
        }
    }

    onMouseDown() {
        console.log('Food: mouseDown');
        this.mc.startDrag();
    }

    onPressUp() {
        console.log('Food: pressUp');
        this.mc.stopDrag();
        this.setPosition(this.mc.x, this.mc.y);
    }
}

export default FishFood;
