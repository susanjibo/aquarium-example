/**
 * Created by andrew on 6/10/15.
 */

import EventManager from './event-manager';

/**
 * PixijsMcEventProxy contains all the elements needed to differentiate event handlers
 * that are tracked by EventManager
 * @class PixijsMcEventProxy
 * @param {object} mc
 * @param {string} event_type
 * @param {function} handler
 */

class GenericMcEventProxy {
    constructor(obj, event_type, handler) {
        this.displayObject = obj; // not necessarily a display object
        this.type = event_type;
        this.handler = handler;
    }

    get rect() {
        return {top:0, left:0, width:0, height:0};
    }

    /**
     * For generic objects, always return true
     * @param point
     * @returns {Boolean}
     */
    isPointInsideMC(point) {
        return true;
    }

    toString() {
        return `Proxy: ${this.displayObject} ${this.type} ${this.handler} NA`;
    }
}

export default GenericMcEventProxy;
