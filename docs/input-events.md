All controller events are handled inside the Emitter, using a type and some events have a special payload

# Button Eents
List of simple buttons:
 - triangle
 - circle
 - x
 - square
 - r1 | r2 | r3 | l1 | l2 | l3
 - psxButton
 - select
 - start
 - dpad(Up|Right|Down|Left)
  
There are 2 events for each button: ":press" and ":release".
E.g. "x:press" and "x:release" 
 

## dualshock controller events
 - connected
 - disconnected
 - battery:charging
 - battery:full
 - battery:high
 - battery:low
 - battery:dying
 - battery:shutdown
 - battery:unknown

# Joysticks
(right|left):move

In addition, the event payload is a object with x and y:

         128|0


0|128   128|128     255|128


        128|255


Example event: "right:move" {"x": 122, "y": 200}