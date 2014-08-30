#Experiment using the Leap Motion to control the robotic Sphero ball.

####To run this app, follow these steps:

1. Clone this repo.
2. Install node on your computer if you haven't already http://nodejs.org
3. Run 'npm install' in your terminal to install the dependencies needed.
4. To find the reference of the Sphero on your computer, run 'ls /dev/tty.Sphero*' in your Terminal and copy the path returned.
5. Paste this path in the index.js file when the 'device' variable is declared.
6. Enable the bluetooth connection on your computer.
7. Run 'node index.js' in your terminal.

And you're done! You should see the Sphero connected in your terminal.

I started working on this code by cloning this repo: https://github.com/alchemycs/spheron-leap so you can see the result in action here: 

https://www.youtube.com/watch?v=3ratT1yCnow&feature=share&list=UUKZdVrHYWr7rVNKbs9_fXnw


Have fun and let me know if you have any issues or questions!



##Current controls:

* Move your fingers/hand UP to make the ball stop & turn blue.
* Move your fingers/hand DOWN to turn the ball stop & turn white.
* Push forward to make Sphero go straight ahead (heading of 0°)
* Pull backward to make Sphero go backward (heading of 180°)
* Swipe left to make Sphero go left (heading of 270°)
* Swipe right to make Sphero go right (heading of 90°)



##Previous notes from the original repo: 

* Set `device` variable to whatever device Sphero connects to your machine has
* There is a timeout of 2000ms to stop Sphero after each gesture to make sure it doesn't go to crazy
* Set the variable `safeMode = false;` if you are trying it out in water, it's much more fun and Sphero is
a bit more mellow when in liquid

##Next steps:

* Try to create modules to make the Sphero move following a pattern (ex: square).

