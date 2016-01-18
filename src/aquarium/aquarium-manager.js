/**
 * Created by andrew on 6/9/15.
 */

import Fish from './fish';
import FishFood from './fish-food';
import EventManager from '../ui/event-manager';
import PixijsUtils from '../ui/pixijs-utils';

class AquariumManager {
    constructor() {
    }

    static init(stage) {
        console.log(`AquariumManager: init`);
        AquariumManager.stage = stage;
        AquariumManager.backgroundLayer = new PIXI.Container();
        AquariumManager.fishLayer = new PIXI.Container();
        AquariumManager.foregroundLayer = new PIXI.Container();
        AquariumManager.stage.addChild(AquariumManager.backgroundLayer);
        AquariumManager.stage.addChild(AquariumManager.fishLayer);
        AquariumManager.stage.addChild(AquariumManager.foregroundLayer);
        AquariumManager.fish = [];
        AquariumManager.food = [];
        AquariumManager.startTime = 0;
        AquariumManager.previousTime = 0;

        EventManager.addEventListener(AquariumManager.eventProxy, "pressup", AquariumManager.onMouseUp);

        AquariumManager.initialized = true;
    }

    static onMouseUp(e) {
        console.log(`AquariumManager: onMouseUp: ${e.stageX},${e.stageY}`);
    }

    static addFish(id, mc_class) {

        let new_fish_mc = new pixiflash_lib[mc_class];
        new_fish_mc = PixijsUtils.MovieClipFactory(new_fish_mc);
        //new_fish_mc.setTransform(400, 0);
        new_fish_mc.framerate = 30;
        new_fish_mc.callback = null; //callback from timeline actions

        AquariumManager.fishLayer.addChild(new_fish_mc);

        let new_fish = new Fish(id, new_fish_mc, mc_class, 0, 0);
        AquariumManager.fish.push(new_fish);

        return new_fish;
    }

    static addFood(x, y) {
        let food_mc = new pixiflash_lib["FoodMC"];
        food_mc = PixijsUtils.MovieClipFactory(food_mc);
        //food_mc.setTransform(400, 0);
        food_mc.framerate = 30;
        food_mc.callback = null; //callback from timeline actions

        AquariumManager.fishLayer.addChild(food_mc);

        let food = new FishFood(food_mc, "FoodMC", x, y);
        food.physics.velocity.y = 20;
        AquariumManager.food.push(food);

        return food;
    }

    static addBackground(mc_class) {

    }

    static addForeground() {
        let new_fg_left = new pixiflash_lib["ForegroundMC"];
        new_fg_left.setTransform(0, 0);

        let new_fg_right = new pixiflash_lib["ForegroundMC"];
        new_fg_right.setTransform(1280, 0);

        AquariumManager.foregroundLayer.addChild(new_fg_left);
        AquariumManager.foregroundLayer.addChild(new_fg_right);
    }


    static getFishWithId(id) {
        let result = null;

        AquariumManager.fish.forEach(fish => {
            if (fish.id == id) {
                result =  fish;
            }
        });

        return result;
    }

    static checkFishFoodCollision(fish, food) {
        let result = false;
        let x_delta = Math.abs(fish.physics.position.x - food.physics.position.x);
        let y_delta = Math.abs(fish.physics.position.y - food.physics.position.y);
        if (x_delta < 10 && y_delta < 10) {
            result = true;
        }

        return result;
    }

    static enterFrameUpdateHandler(frame_time, total_time) {
        AquariumManager.fish.forEach(fish => {
            fish.update(frame_time, total_time);
        });

        AquariumManager.food.forEach(food => {
            if (food.alive) {
                food.update(frame_time, total_time);
            }
        });

        AquariumManager.fish.forEach(fish => {
            AquariumManager.food.forEach(food => {
                if (AquariumManager.checkFishFoodCollision(fish, food)) {
                    food.physics.position.y = 800;
                    fish.physics.velocity.x = (-300 * fish.scale.x);
                }
            });
        });
    }
}

AquariumManager.initialized = false;
AquariumManager.eventProxy = {};

export default AquariumManager;
