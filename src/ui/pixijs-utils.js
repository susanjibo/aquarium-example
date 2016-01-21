/**
 * Created by Andrew Rapo on 11/12/15.
 */

import EventManager from './event-manager';
import Vector2 from './vector2';

class PixijsUtils {


    static MovieClipFactory(pixijs_movieclip) {

        pixijs_movieclip.isEventManagerReady = true;

        pixijs_movieclip.addEventListener = function(event_type, handler) {
            //console.log(`PixijsUtils: addEventListener: ${event_type}`);
            EventManager.addEventListener(this, event_type, handler);
        };

        pixijs_movieclip.removeEventListener = function(event_type, handler) {
            //console.log(`PixijsUtils: removeEventListener: ${event_type}`);
            EventManager.removeEventListener(this, event_type, handler);
        };

        pixijs_movieclip.drag = function(e) {
            //console.log(this);
            if (!this.startDragOffset) {
                this.startDragOffset = new Vector2(this.x - e.stageX, this.y - e.stageY);
            }
            if (this.dragging) {
                this.x = e.stageX + this.startDragOffset.x;
                this.y = e.stageY + this.startDragOffset.y;
            }
        };

        pixijs_movieclip.dragHandler = pixijs_movieclip.drag.bind(pixijs_movieclip);

        pixijs_movieclip.startDrag = function() {
            this.dragging = true;
            this.addEventListener("pressmove", pixijs_movieclip.dragHandler);
        };

        pixijs_movieclip.stopDrag = function() {
            this.dragging = false;
            this.startDragOffset = null;
            this.removeEventListener("pressmove", pixijs_movieclip.dragHandler);
        };

        return pixijs_movieclip;
    }
}

export default PixijsUtils;
