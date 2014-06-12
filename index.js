/* jshint node:true */
/* If you are cloning this folder, just run 'npm install' in your terminal to install
the node dependencies (leapjs and spheron), enable your bluetooth on your computer,
and then simply run 'node index.js' in your terminal again to launch the app. */

/*This code is not mine at the moment, I cloned it from this repo: https://github.com/alchemycs/spheron-leap */

var Leap = require('leapjs');
var spheron = require('spheron');

// Set this to the device Sphero connects as on your computer
var device = '/dev/tty.Sphero-RBR-AMP-SPP';


var safeMode = true; //Turn this off if Sphero is in water or you like to live dangerously!

var controlSphero = function(sphero) {

  var controller = new Leap.Controller({frameEventName:'deviceFrame', enableGestures:true});

  controller.on('connect', function() {
    console.log('connected to leap motion');
  });
  controller.on('protocol', function(p) {
    console.log('protocol', p);
  });
  controller.on('ready', function() {
    console.log('ready');
  });
  controller.on('blur', function() {
    console.log('blur?');
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

      if (g.type == 'swipe' && g.state ==='stop') {
        handleSwipe(g);
      }
      if (g.type == 'circle') {
        console.log('circle');
        handleCircle(g);
      }

    }
  });

  var handleCircle = function(g) {
    sphero.write(spheron.commands.api.setHeading(10, { resetTimeout:true }));
  };

  var handleSwipe = function(g) {
    var X = g.position[0] - g.startPosition[0];
    var Y = g.position[1] - g.startPosition[1];
    var Z = g.position[2] - g.startPosition[2];

    var aX = Math.abs(X);
    var aY = Math.abs(Y);
    var aZ = Math.abs(Z);

    var big = Math.max(aX, aY, aZ);
    var direction = '?';

    if (aX === big) {
      direction = 'RIGHT';
      if (X < 0) {
        direction = 'LEFT';
      }
    } else if (aY === big) {
      direction = 'UP';
      if (Y < 0) {
        direction = 'DOWN';
      }
    } else if (aZ === big) {
      direction = 'REVERSE';
      if (Z < 0) {
        direction = 'FORWARD';
      }
    }

    switch (direction) {
      case 'LEFT':
        sphero.heading = 270;
        sphero.roll(128, 270, 1);
        if (safeMode) {
          setTimeout(function() {
            stopSphero(sphero);
          }, 2000);
        }
        break;
      case 'RIGHT':
        sphero.heading = 90;
        sphero.roll(128, 90, 1);
        if (safeMode) {
          setTimeout(function() {
            stopSphero(sphero);
          }, 2000);
        }
        break;
      case 'UP':
        stopSphero(sphero);
        break;
      case 'DOWN':
        stopSphero(sphero);
        break;
      case 'FORWARD':
        sphero.heading = 0;
        sphero.roll(128, 0, 1);
        if (safeMode) {
          setTimeout(function() {
            stopSphero(sphero);
          }, 2000);
        }
        break;
      case 'REVERSE':
        sphero.heading = 180;
        sphero.roll(128, 180, 1);
        if (safeMode) {
          setTimeout(function() {
            stopSphero(sphero);
          }, 2000);
        }

        break;

    }

    console.log('Direction: %s', direction);
  }

  controller.connect();
  console.log('waiting for Leap Motion connection...');
};


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
