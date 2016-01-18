import path from 'path';
import jibo from 'jibo';
import MimManager from '../mim/mim-manager.js';
import AsrResults from '../mim/asr-result.js';
import SpeakerIds from '../mim/speaker-ids.js';

let {Status, createBehavior, factory, blackboard} = jibo.bt;

module.exports = createBehavior({
    constructor(getConfig, onStatus, onResults) {
        this.getConfig = getConfig;
        this.onStatus = onStatus;
        this.onResults = onResults;
        this.status = Status.INVALID;
        this.mimConfig = null;
        this.mimState = null;
        this.asrResults = null;
        this.speakerIds = null;
        this.guiManagerEventHandler = this.onGuiManagerEvent.bind(this);
    },
    onGuiManagerEvent(event) {
        //console.log(`MimGui: guiManagerEventHandler ${event.type}`);
        switch (event.type) {
            case 'itemSelected':
                this.status = Status.SUCCEEDED;
                this.asrResults = new AsrResults({
                    Input: event.data.label,
                    NLParse: { input:event.data.label, slotAction: event.data.label},
                    heuristic_score: 10
                });
                if (event.data.speakerIds && (event.data.speakerIds.length > 0)) {
                    this.speakerIds = new SpeakerIds({
                        speakerIdStatus: "ACCEPTED",
                        speakerIds: event.data.speakerIds
                    });
                } else {
                    this.speakerIds = new SpeakerIds({
                        speakerIdStatus: "NO-SPEAKERS-TO-LIST",
                        speakerIds: []
                    });
                }
                this.stop();
                break;
            case 'swipeDown':
                break;
        }
    },
    start() {
        //console.log(`MimGui: start`);
        this.status = Status.IN_PROGRESS;
        let mim_data = this.getConfig();
        this.mimConfig = mim_data.mimConfig;
        this.mimState = mim_data.mimState;
        this.asrResults = null;
        this.speakerIds = null;

        if (MimManager.guiManager) {
            MimManager.guiManager.addEventListener(this.guiManagerEventHandler);
            MimManager.guiManager.listenStart(this.mimState, this.mimConfig);
        }
        return true;
    },
    stop() {
        //console.log(`MimGui: stop`, this.asrResults);
        if (MimManager.guiManager && (this.status === Status.SUCCEEDED)) {
            MimManager.guiManager.removeEventListener(this.guiManagerEventHandler);
            MimManager.guiManager.listenStop(this.mimState, this.asrResults, this.speakerIds);
        }
        if (this.asrResults) {
            this.onResults({
                asrResults: this.asrResults,
                speakerIds: this.speakerIds
            });
        }
    },
    update() {
        return this.status
    }
});

factory.addBehavior(module, "project");
