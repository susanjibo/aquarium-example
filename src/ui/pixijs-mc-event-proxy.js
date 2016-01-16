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

class PixijsMcEventProxy {
    constructor(mc, event_type, handler) {
        this.displayObject = mc;
        this.type = event_type;
        this.handler = handler;
    }

    get rect() {
        let rect = {top:0, left:0, width:0, height:0};

        if (this.displayObject) {
            let bounds = this.displayObject.getBounds();
            rect = {top: bounds.y, left: bounds.x, width: bounds.width, height: bounds.height};
        }

        return rect;
    }

    /**
     * Checks to see if a point is inside the bounding rect of a movieclip
     * @param point
     * @returns {Boolean}
     */
    isPointInsideMC(point) {
        if (!this.displayObject) {
            return true;
        } else if (point.x > this.rect.left && point.x < (this.rect.left + this.rect.width)) {
            if (point.y > this.rect.top && point.y < (this.rect.top + this.rect.height)) {
                return true;
            }
        }

        return false;
    }

    toString() {
        return `Proxy: ${this.displayObject} ${this.type} ${this.handler} ${this.rect}`;
    }
}

export default PixijsMcEventProxy;
