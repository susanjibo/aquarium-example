/**
 * Created by Andrew Rapo on 5/4/15.
 * Based on SimplePhysicsModel by Jackson Dunstan
 */

import Vector2 from '../ui/vector2';

class SimplePhysiscsModel {
    constructor() {
        this.position = new Vector2();
        this.velocity = new Vector2();
        this.force = new Vector2();
        this.mass = 1;
        this.rotation = 0;
        this.rotationVelocity = 0;
        this.friction = new Vector2(1.0, 1.0);
    }

    /*
     get mass()
     {
     return this.mass;
     }

     set mass(mass)
     {
     this.assert(!isNaN(mass), "Invalid mass: " + mass);

     this.mass = mass;
     }
     */

    getRotation() {
        return this.rotation;
    }

    setRotation(radians) {
        this.assert(radians != null, "Cannot set to a null rotation");

        this.rotation = radians;
    }

    getRotationVelocity() {
        return this.rotationVelocity;
    }

    setRotationVelocity(radians) {
        this.assert(radians != null, "Cannot set to a null rotationVelocity");

        this.rotationVelocity = radians;
    }

    getVelocity() {
        return this.velocity;
    }

    setVelocity(velocity) {
        this.assert(velocity != null, "Cannot set to a null velocity");
        this.assert(velocity.valid, "Cannot set to an invalid velocity: " + velocity);

        this.velocity = velocity;
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.assert(position != null, "Cannot set to a null position");
        //this.assert(position.valid, "Cannot set to an invalid position: " + position.toString());

        this.position = position;
    }

    /*
     get force()
     {
     return this.force;
     }

     set force(force)
     {
     this.assert(force != null, "Cannot set to a null force");
     this.assert(force.valid, "Cannot set to an invalid force: " + force);

     this.force = force;
     }
     */
    assert(test, msg) {
        if (!test) {
            console.log(`SimplePhysics: ${msg}`)
        }
    }

    toString() {
        return `f: ${this.force.toString()} v: ${this.velocity.toString()} p: ${this.position.toString()}`;
    }

    update(elapsed) {
        var elapsedSeconds = elapsed * 0.001; //convert milliseconds to seconds

        var accelerationX = this.force.x / this.mass;
        var accelerationY = this.force.y / this.mass;

        this.velocity.x += accelerationX * elapsedSeconds;
        this.velocity.y += accelerationY * elapsedSeconds;

        this.velocity.x *= this.friction.x;
        this.velocity.y *= this.friction.y;

        this.position.x += this.velocity.x * elapsedSeconds;
        this.position.y += this.velocity.y * elapsedSeconds;

        this.rotation += this.rotationVelocity * elapsedSeconds;
    }
}

export default SimplePhysiscsModel;