# Jibo Behavior Tree Examples

## Before you open in Atom

```
cd sample-code
npm install
```
If you don't `npm install` first you'll get errors in Atom.

## Running an example tree

In `src/main.js` find the line of code that creates the behavior tree.

```
let root = factory.create('../behaviors/01-sequence');
```
Replace the relative path to the example tree you want to run. Then `cmd-r` (windows `ctrl-r`) to run the example in the Jibo Simulator.

## 01: Sequence

Plays two animations in sequence.

## 02: Parallel

Plays an animation and an audio file in parallel.

## 03: Generic Animation Event

Animations (`.keys` files) have the ability to dispatch generic events at specific keyframes. In **animations/greeting-with-event.keys** an Event Layer is included. Click on the keyframe and notice that it is set to dispatch an event called `blink`. The animation system dispatches the event on an emitter that is being listened to by the `StartOnAnimEvent` decorator. This decorator will start its behavior when the specified event is heard.

This allows a developer to hook up logic to synchronize with exact keyframes in an animation.

## 04: WhileCondition

A `WhileCondition` is a decorator that will restart a behavior that succeeded if a condition is met. In this example the `WhileCondition` is restarting a sequence playing two animations. The effect is that these animations are played forever in a sequence.

## 05: More Advanced WhileCondition

In this example, the `WhileCondition` is placed directly on an animation. It creates a `self.count` variable in its initialization function and decrements it each time its condition function is called. When the conditional returns false, the `WhileCondition` allows the `PlayAnimation` behavior to succeed and a sound is played.

## 06: Single-Shot Look-At

The `LookAt` behavior has two modes. In this example, the behavior is set to *single-shot*, which means that `getTarget` is called once, and the behavior succeeds once Jibo does a best-effort to look at that target. `TimeoutJs` is a behavior that does nothing for an amount of time. The whole sequence is repeated.

## 07: Continuous-Mode Look-At

Here, `LookAt` is set to be continuous-mode. This means that `getTarget` will be called every frame to ask for a new target. In this mode, the behavior never succeeds. That is, it will always remain *in progress* until a decorator forces it to succeed or fail, or if a parent explicitly stops it.

## 08: Idle

This is very similar to example 06. But the look at sequence is also in parallel with an other sequence that makes Jibo blink at random intervals.

## 09: Switch

A `Switch` is how behavior trees deal with branching logic. `Switch` is very similar to a switch/case statement. The `Switch` will play its children in sequence until one succeeds. The `Case` decorator can fail a behavior before it's even started if its conditional returns false.

In this example, an `ExecuteScript` behavior sets a property on `notepad` that the `Case` decorators can check against. Thus, one of two animations will be played.

## 10: Subtrees

Subtrees are how behaviors trees deal with encapsulation. They are a way of treating a whole `.bt` file as a single behavior.

The `getNotepad` argument allows a parent tree to prepopulate a Subtree's notepad. This is how behavior trees can pass arguments to a subtree. The **beahviors/10-subtrees/choose-animation.bt** plays an animation according to a property on its notepad. This notepad property is set by its parent tree.

Subtrees can also return result. Every tree has a `result` object scoped to a single `.bt` file. Any function argument can add properties to this object. When the tree returns, its parent tree will get that result object. This is how behavior trees deal with return values. So imagine you have a subtree called `get-persons-name.bt`: that subtree may be highly complex and encapsulate a range of behaviors such as voice recognition, facial identification, and simply asking someone what their name is. From the point of view of the parent tree, the mechanism by which that subtree obtains a person's name is a black box, but the end result is that that subtree returns the appropriate information.

## 11: Succeed Decorators

Succeed decorators force a behavior to succeed. It might force success from an emitted event from an animation or emitter, a conditional, or a timeout. More sophisticated success decorators might succeed a behavior if Jibo hears "Hey Jibo", or any arbitrary parsed rule.

In this example, there are three subtrees which all point to the idle behavior tree, which never succeeds unless decorated or explicitly stopped by a parent. The first subtree succeeds after 5 seconds, then the robot zeros itself, blinks and plays a sound. The second subtree succeeds when an event is emitted from the `emitter` object available globally. The third subtree saves when it started and forces success after a period of time.

## 12: StartOn Decorators

Decorators can also control when a behavior starts.

`StartOnAnimEvent` was introduced in example 3, and prevents its behavior from starting until an event from an animation is dispatched.

`StartOnCondition` is the most generic and flexible of the StartOn decorators, and will only start a behavior when the `condition` argument returns `true`. In this example, the `PlayAudio` behavior is started after a random amount of time between 2 and 6 seconds. The second `PlayAudio` behavior only starts after the `start` event is emitter from the global emitter.

## 13: Custom Behaviors

Besides the build in behaviors and decorators included in the Jibo SDK, developers can create their own custom ones. A custom behavior consists of two parts: the behavior code (`src/behaviors/center-robot.js`) and the schema (`schema/center-robot.js`). In this example project, a custom behavior called CenterRobot is included. This behavior will either center the robot locally or globally. Globally centering Jibo will face him away from his cord in the back. Locally centering him, will make Jibo sit upright in whatever direction he last procedurally look at. in `behaviors/13-custom-behaviors.bt` the robot first looks right, then it centers globally, then looks right again and centers locally.

## 14: Custom Decorators

Developers can also create custom decorators. In this example, `SucceedOnTouch` will force a behavior to succeed when Jibo's face is touched. In the simulator, click directly on his face.

Decorators are very similar to behaviors in how to code them and hook them up. The biggest difference is is the update function.

### Behavior's update function
A behavior just needs to return a status to the behavior tree engine.
```
update() {
    return Status.IN_PROGRESS;
}
```
### Decorator's update function
When the engine runs its update cycle, it first updates the behavior before updating its decorators. The result of the behavior is passed into the update function of its decorators. Each decorator then has the opportunity to modify or change the status of the behavior its decorating.

#### Decorator that at some point could force its behavior to succeed.
```
update(result) {
    if(this.doForceSuccess) {
        return Status.SUCCEEDED;
    }
    return result;
}
```
#### Decorator that inverts the status of a finished behavior.
```
update(result) {
    if(result === Status.SUCCEEDED) {
        return Status.FAILED;
    }
    else if(result === Status.FAILED) {
        return Status.SUCCEEDED;
    }
    return result;
}
```

## 15: Multiple Decorators

Multiple decorators can be on a behavior at once. The engine first updates the behavior then updates the decorators in order. The first decorator to return either `Status.FAILED` or `Status.SUCCEEDED` wins and all decorators on that behavior are stopped.

In this example, we decorate a subtree with both a `FailOnTouch` and `SucceedOnTouch` decorator. The subtrees are under a `Sequence` and a `Switch`. In order for RobotCenter1 to be executed in the `Sequence`, the sibling above it must finish with status success. Because `SucceedOnTouch` is first, it wins, and succeeds the subtree. In order for CenterRobot2 to be executed in the `Switch`, the sibling above it must finish with status failed (remember `Switch` executes its children in order until one succees). Because `FailOnTouch` is first, it wins, and fails the subtree, allowing the robot to center.
