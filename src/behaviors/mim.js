import path from 'path';
import jibo from 'jibo';
import MimManager from '../mim/mim-manager.js';
import AsrResults from '../mim/asr-result.js';
import SpeakerIds from '../mim/speaker-ids.js';
import MimState from '../mim/mim-state.js';

let {Status, createBehavior, factory} = jibo.bt;

let blackboard;
blackboard = {
};

module.exports = createBehavior({
    constructor(getConfig, onStatus, onResults) {
        this.getConfig = getConfig;
        this.onStatus = onStatus;
        this.onResults = onResults;
        this.status = Status.INVALID;
    },
    start() {
        this.status = Status.IN_PROGRESS;
        //console.log(`mim.js: loading mim-bt from: ${__dirname}`);
        blackboard.MimManager = MimManager;
        blackboard.AsrResults = AsrResults;
        blackboard.SpeakerIds = SpeakerIds;
        blackboard.MimState = MimState;

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
