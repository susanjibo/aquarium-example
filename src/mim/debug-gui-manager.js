/**
 * Created by Andrew Rapo on 12/27/15.
 */


class DebugGuiManager {

    static init(ui_div) {
        console.log(`DebugGuiManager: ui_div: ${ui_div}`);
        DebugGuiManager.uiDiv = ui_div;

        if (!DebugGuiManager.initialized && DebugGuiManager.uiDiv) {
            DebugGuiManager.mimStateDiv = document.createElement("div");
            DebugGuiManager.mimConfigDiv = document.createElement("div");
            DebugGuiManager.resultsDiv = document.createElement("div");

            DebugGuiManager.uiDiv.appendChild(DebugGuiManager.mimStateDiv);
            DebugGuiManager.uiDiv.appendChild(DebugGuiManager.mimConfigDiv);
            DebugGuiManager.uiDiv.appendChild(DebugGuiManager.resultsDiv);

            DebugGuiManager.reset();

            DebugGuiManager.initialized = true;
        }
    }

    static addEventListener(listener) {
        DebugGuiManager.eventListener = listener; //TODO: something better. One listener for now.
    }

    static removeEventListener(listener) {
        DebugGuiManager.eventListener = null; //TODO: something better. One listener for now.
    }

    static update() {

    }

    static reset() {
        DebugGuiManager.mimConfigDiv.innerHTML = 'Mim Config:';
        DebugGuiManager.resultsDiv.innerHTML = 'Results:'
    }

    static listenStart(mim_state, mim_config) {
        DebugGuiManager.updateMimState(mim_state);
        DebugGuiManager.updateMimConfig(mim_config);
    }

    static listenStop(mim_state, asr_results, speaker_ids) {
        DebugGuiManager.updateMimState(mim_state);
        DebugGuiManager.updateResults(asr_results, speaker_ids);
    }

    static updateMimConfig(config) {

        DebugGuiManager.mimConfigDiv.innerHTML = config.toHtml();
    }

    static updateMimState(state) {

        DebugGuiManager.mimStateDiv.innerHTML = state.toHtml();
    }

    static updateResults(asr_results, speaker_ids) {
        let asr_results_html = '<p>Results:</p>';
        let speaker_ids_html = '<p>SpeakerIds:</p>';

        if (asr_results) {
            asr_results_html = asr_results.toHtml();
        }

        if (speaker_ids) {
            speaker_ids_html = speaker_ids.toHtml();
        }

        DebugGuiManager.resultsDiv.innerHTML = asr_results_html + speaker_ids_html;
    }


    static dispose() {
        if (DebugGuiManager.initialized) {
            DebugGuiManager.uiDiv.removeChild(DebugGuiManager.mimConfigDiv);
            DebugGuiManager.uiDiv.removeChild(DebugGuiManager.mimStateDiv);
            DebugGuiManager.uiDiv.removeChild(DebugGuiManager.resultsDiv);
            DebugGuiManager.initialized = false;
            DebugGuiManager.uiDiv = null;
            DebugGuiManager.mimConfigDiv = null;
            DebugGuiManager.mimStateDiv = null;
            DebugGuiManager.resultsDiv = null;
            DebugGuiManager.eventListener = null;
        }
    }

}

DebugGuiManager.initialized = false;
DebugGuiManager.uiDiv = null;

DebugGuiManager.mimConfigDiv = null;
DebugGuiManager.mimStateDiv = null;
DebugGuiManager.resultsDiv = null;

DebugGuiManager.eventListener = null;

export default DebugGuiManager;
