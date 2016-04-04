# Control the Sphero with the Leap Motion.

## To run this app, follow these steps:

1. Clone this repo.

2. Install node on your computer if you haven't already http://nodejs.org

3. Run 'npm install' in your terminal to install the dependencies needed.

4. To find the reference of the Sphero on your computer, turn your bluetooth on, connect to the Sphero and then, run 'ls /dev/tty.Sphero*' in your Terminal and copy the path returned.

5. Paste this path in the index.js file when the 'device' variable is declared.

7. Run 'node app.js' in your terminal.


And you're done! You should see the Sphero connected in your terminal.

Have fun and let me know if you have any issues or questions!

## Current controls:

* Move your hand UP or DOWN to make the ball stop.
* Move your hand forward to make Sphero go straight ahead (heading of 0°)
* Move your hand backwards to make Sphero go backwards (heading of 180°)
* Swipe left to make Sphero go left (heading of 270°)
* Swipe right to make Sphero go right (heading of 90°)
