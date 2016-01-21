import path from 'path';
import jibo from 'jibo';

let {Status, createBehavior, factory} = jibo.bt;

let blackboard = {};

module.exports = createBehavior({
    constructor(getConfig, onStatus, onResults) {
        this.getConfig = getConfig;
        this.onStatus = onStatus;
        this.onResults = onResults;
        this.status = Status.INVALID;
    },
    start() {
        this.status = Status.IN_PROGRESS;

        this.root = factory.create('./mim-bt', {
            blackboard: blackboard,
            notepad: {config: this.getConfig(), onStatus: this.onStatus, onResults: this.onResults}
        });

        return this.root.start();
    },
    stop() {

    },
    update() {
        this.root.update();
        return this.root.status
    }
});

factory.addBehavior(module, "project");
