/* Read the README file if you have some troubles making this code work. */

/* I started working on this code from this repo: https://github.com/alchemycs/spheron-leap */

var Leap = require('leapjs');
var spheron = require('spheron');

// Set this to the device Sphero connects as on your computer.
var device = '/dev/tty.Sphero-RBR-AMP-SPP';

var safeMode = true; //Turn this off if Sphero is in water or you like to live dangerously!

var controlSphero = function(sphero) {

  var controller = new Leap.Controller({frameEventName:'deviceFrame', enableGestures:true});

  //Debugging console messages to make sure the Leap Motion is connected and working.
  controller.on('connect', function() {
    console.log('connected to leap motion');
  });
  controller.on('ready', function() {
    console.log('ready');
  });
  controller.on('focus', function() {
    console.log('focus?');
  });
  controller.on('deviceConnected', function() {
    console.log('device connected');
  });
  controller.on('deviceDisconnected', function() {
    console.log('device disconnected');
  });
  controller.on('frame', function(frame) {
    if (frame.gestures.length) {
      var g = frame.gestures[0];

      //Basically checks if there is movement. Need to try without the 'stop' one.
      if (g.type == 'swipe' && g.state ==='stop') {
        handleSwipe(g);
      }
      // if (g.type == 'circle') {
      //   console.log('circle');
      //   handleCircle(g);
      //  }
    }
  });

  // I think this function resets the heading everytime which makes it look like its rotating.
  // var handleCircle = function(g) {
  //   sphero.write(spheron.commands.api.setHeading(10, { resetTimeout:true }));
  // };

  var handleSwipe = function(g) {
    // Checks the difference between the start position and the end position of the fingers on each axis.
    var X = g.position[0] - g.startPosition[0];
    var Y = g.position[1] - g.startPosition[1];
    var Z = g.position[2] - g.startPosition[2];
    console.log("Z is ", Z)
    console.log("X is ", X)
    console.log("Y is ", Y)

    // Gets the absolute values.
    var aX = Math.abs(X);
    var aY = Math.abs(Y);
    var aZ = Math.abs(Z);

    // Gets the maximum value to check in which direction the user moved its fingers.
    var big = Math.max(aX, aY, aZ);
    // direction gets returned in the console. default value is '?'. Not necessary.
    var direction = '?';

    // If the maximum value returned is the X one, execute the cases called "LEFT" or "RIGHT".
    if (aX === big) {
      direction = 'RIGHT';
      if (X < 0) {
        direction = 'LEFT';
      }
    // If the maximum value returned is the Y one, execute the cases called "UP" or "DOWN".
    } else if (aY === big) {
      direction = 'UP';
      if (Y < 0) {
        direction = 'DOWN';
      }
    // If the maximum value returned is the Z one, execute the cases "FORWARD" or "REVERSE".
    } else if (aZ === big) {
      direction = 'REVERSE';
      if (Z < 0) {
        direction = 'FORWARD';
      }
    }

    switch (direction) {
      // Original settings included: 'sphero.heading = (heading value)';
      // Original speed for all of them: 128.
      case 'LEFT':
        //sphero.roll(speed, heading, state, option)
        sphero.roll(70, 270, 1); //Heading is expressed in degrees so 270 will make the ball move to the left.
        break;
      case 'RIGHT':
        sphero.heading = 90;
        sphero.roll(70, 90, 1);
        break;
      case 'UP':
        stopSphero(sphero);
        //Make the ball turn blue when users move their hand up.
        ball.setRGB(spheron.toolbelt.COLORS.BLUE).setBackLED(255);
        break;
      case 'DOWN':
        stopSphero(sphero);
        //Make the ball turn white when users move their hand down.
         ball.setRGB(spheron.toolbelt.COLORS.WHITE).setBackLED(255);
        break;
      case 'FORWARD':
         sphero.roll(70, 0, 1);
        break;
      case 'REVERSE':
        sphero.heading = 180;
        sphero.roll(70, 180, 1);
        break;

        /*--------------
          If you want to add a delay between each action, add this in each case,
          just before the break to add a 2s delay.
        
          if (safeMode) {
           setTimeout(function() {
             stopSphero(sphero);
           }, 2000);
        }
        ---------------*/
    }
    console.log('Direction: %s', direction);
  }

  controller.connect();
  console.log('waiting for Leap Motion connection...');
};

// Stops the Sphero from rolling.
var stopSphero = function(sphero) {
  sphero.roll(0,sphero.heading||0,0);
};

var ball = spheron.sphero().resetTimeout(true);
ball.open(device);

console.log("waiting for Sphero connection...");
ball.on('open', function() {
  console.log('connected to Sphero');
  ball.setRGB(spheron.toolbelt.COLORS.PURPLE).setBackLED(255);
  controlSphero(ball);
});
