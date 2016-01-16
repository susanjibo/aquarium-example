/**
 * Created by Andrew Rapo on 1/8/16.
 */

class MimManager {

    static init () {
        if (!MimManager.initialized) {
            MimManager.initialized = true;
            console.log(`MimManager: initialized`);
        }
    }

    static setGuiManager(gui_manager) {
        MimManager.guiManager = gui_manager;
    }

    static getGuiManager() {
        return MimManager.guiManager;
    }

}

MimManager.initialized = false;
MimManager.guiManager = null;

export default MimManager;
