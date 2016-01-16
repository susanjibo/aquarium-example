/**
 * Created by andrew on 6/8/15.
 */

import PixijsMcEventProxy from './pixijs-mc-event-proxy.js';
import GenericMcEventProxy from './generic-mc-event-proxy.js';
import Vector2 from './vector2';

/**
 * Rudimentary EventManager allows subscribers to be registered to receive notifications when
 * UI events occur. EventManager must be made aware of these events via calls to
 * onFrameEvent(target, event_type, x, y)
 * onMouseDown(target, event_type, x, y)
 * onMouseUp(target, event_type, x, y)
 * onMouseMove(target, event_type, x, y)
 * These events are then propagated to the registered subscribers
 * @class EventManager
 */

class EventManager {
    constructor() {
    }

    static init(stage) {
        console.log(`EventManager: init: ${stage}`);

        if (!stage) {
            console.log(`EventManager: init: WARNING: 'stage' parameter must be a valid stage`);
        }
        EventManager.stage = stage;

        EventManager.subscribers = {
            mousedown: [],
            pressup: [],
            pressmove: [],
            enterframe: []
        };
        EventManager.initialized = true;
    }

    static setStage(stage) {
        EventManager.stage = stage;
    }

    static addEventListener(display_object, event_type, handler) {
        if (!EventManager.subscribers[event_type]) {
            EventManager.subscribers[event_type] = [];
        }

        let proxy;

        if (display_object) {
            if (display_object._isPixiFlash) {
                //console.log(`EventManager: addEventListener: ${event_type}: display_object is a pixiflash.DisplayObject`);
                //console.log(display_object);
                proxy = new PixijsMcEventProxy(display_object, event_type, handler);
                EventManager.subscribers[event_type].push(proxy);
            } else {
                //console.log(`EventManager: addEventListener: ${event_type}: display_object is a generic type`);
                proxy = new GenericMcEventProxy(display_object, event_type, handler);
                EventManager.subscribers[event_type].push(proxy);
            }
        } else {
            console.log(`EventManager: addEventListener: ${event_type}: display_object is null or undefined`);
            console.log(`NOTE: This approach is DEPRECATED! Please provide a valid object.`);
            proxy = new GenericMcEventProxy(null, event_type, handler);
            EventManager.subscribers[event_type].push(proxy);
        }

    }

    static removeEventListener(display_object, event_type, handler) {
        let proxy_list = EventManager.subscribers[event_type];
        let new_proxy_list = [];
        proxy_list.forEach(existing_proxy => {
            if (!((display_object === existing_proxy.displayObject) && (handler === existing_proxy.handler))) { //(existing_proxy != handler) {
                new_proxy_list.push(existing_proxy);
            } else {
                //console.log(`removeEventListener: ${existing_proxy.toString()}`);
            }
        });
        EventManager.subscribers[event_type] = new_proxy_list;
    }

    static onMouseDown(target, event_type, x, y) {
        //target returns the active canvas so it is not useful for determining which clip has been hit
        if (EventManager.initialized) {
            let proxy_list = EventManager.subscribers[event_type];
            //console.log(`EM: onMouseDown: listeners: ${proxy_list.length}`);
            proxy_list.forEach(proxy => {
                if (proxy.isPointInsideMC(new Vector2(x, y))) {
                    let event = {proxy: proxy, target: proxy.displayObject, type: proxy.type, stageX: x, stageY: y};
                    proxy.handler(event);
                }
            });
        } else { 
            console.log(`EventManager must be initialized!`);
        }

    }

    static onMouseUp(target, event_type, x, y) {
        //target returns the active canvas so it is not useful for determining which clip has been hit
        if (EventManager.initialized) {
            let proxy_list = EventManager.subscribers[event_type];
            //console.log(`EM: onMouseUp: listeners: ${proxy_list.length}`);
            proxy_list.forEach(proxy => {
                if (proxy.isPointInsideMC(new Vector2(x, y))) {
                    let event = {proxy: proxy, target: proxy.displayObject, type: proxy.type, stageX: x, stageY: y};
                    proxy.handler(event);
                }
            });
        } else { 
            console.log(`EventManager must be initialized!`);
        }
    }

    static onMouseMove(target, event_type, x, y) {
        //target returns the active canvas so it is not useful for determining which clip has been hit
        if (EventManager.initialized) {
            let proxy_list = EventManager.subscribers[event_type];

            proxy_list.forEach(proxy => {
                //if (proxy.isPointInsideMC(new Vector2(x, y))) {
                    let event = {proxy: proxy, target: proxy.displayObject, type: proxy.type, stageX: x, stageY: y};
                    proxy.handler(event);
                //}
            });
        } else { 
            console.log(`EventManager must be initialized!`);
        }
    }
}

EventManager.initialized = false;

export default EventManager;
