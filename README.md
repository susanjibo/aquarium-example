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

Subtrees can also return result. Every tree has a `result` object scoped to a single `.bt` file. Any function argument can add properties to this object. When the tree returns, its parent tree will get that result object. This is how behavior trees deal with return values. So imagine you have a subtree called `get-persons-name.bt`.
