import jibo from 'jibo';
let {Status, factory, createBehavior} = jibo.bt;

module.exports = createBehavior({
    constructor: function (start, stop, update) {
        this.startCallback = start;
        this.stopCallback = stop;
        this.updateCallback = update;

        this.frameTime = null; //1000 / 30; //30 fps

        this.status = Status.INVALID;
        console.log(`BehaviorBehavior: Constructor: `);

    },
    start: function () {
        this.startTime = new Date().getTime();
        this.currentTime = this.startTime;
        this.prevTime = this.startTime;
        this.elapsedTime = 0;
        this.status = Status.IN_PROGRESS;

        this.behaviorData = this.startCallback();

        if (this.behaviorData && this.behaviorData.frameRate) {
            this.frameTime = 1000 / this.behaviorData.frameRate;
        }
        console.log(`BehaviorBehavior: Start: frameTime: ${this.frameTime}`);

        return true;
    },
    stop: function () {
        console.log(`BehaviorBehavior: Stop: `);
        this.stopCallback(this.updateResult);
    },
    update: function () {
        this.currentTime = new Date().getTime();
        this.elapsedTime = this.currentTime - this.prevTime;

        this.updateResult = {};

        if ((!this.frameTime) || (this.elapsedTime > this.frameTime)) {
            this.prevTime = this.currentTime;

            this.updateResult = this.updateCallback(this.elapsedTime);

            if (this.updateResult.status === 'SUCCEEDED') {
                //this.stop();
                this.status = Status.SUCCEEDED;
            } else if (this.updateResult.status === 'FAILED') {
                //this.stop();
                this.status = Status.FAILED;
            }
        }

        return this.status;
    }
});
factory.addBehavior(module, "project");
