# Jibo Behavior Tree Examples

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

The `LookAt` behavior has two modes. In this example, the behavior is set to *single-shot*, which means that `getTarget` is called once, and the behavior succeeds once Jibo does a best-effort to look at that target. `TimeoutJs` is a behavior that does nothing for an amount of time.  
