module.exports = function() {

  var Leap = require('leapjs');
  var sphero = require("sphero");

  // Set this to the port the Sphero uses on your computer.
  var device = sphero("/dev/tty.Sphero-RBR-AMP-SPP");

  var safeMode = true; //Turn this off if Sphero is in water or you like to live dangerously!

  var controlSphero = function(spheroBall) {

      var controller = Leap.loop({frameEventName:'deviceFrame', enableGestures:true});

      controller.on('connect', function() {
      	console.log('connected to leap motion');
      });
      controller.on('ready', function() {
          console.log('ready');
      });
      controller.on('deviceStreaming', function() {
          console.log('device connected');
      });
      controller.on('deviceStopped', function() {
          console.log('device disconnected');
      });
      controller.on('frame', function(frame) {
        if(frame.hands[0]){
          var hand = frame.hands[0];
          handleSwipe(hand);
        }
      });

      var handleSwipe = function(hand) {
        var previousFrame = controller.frame(1);
        var movement = hand.translation(previousFrame);
        var direction = '?';

        if(movement[0] > 4){
          direction = 'RIGHT'
        } else if(movement[0] < -4){
          direction = 'LEFT'
        }

        if(movement[1] > 4){
          direction = 'UP'
        } else if(movement[1] < -4){
          direction = 'DOWN'
        }

        if(movement[2] > 4){
          direction = 'REVERSE'
        } else if(movement[2] < -4){
          direction = 'FORWARD'
        }

        switch (direction) {
          case 'LEFT':
            //sphero.roll(speed, heading, state, option). Heading is expressed in degrees.
            spheroBall.roll(70, 270, 1);
            break;
          case 'RIGHT':
            spheroBall.heading = 90;
            spheroBall.roll(70, 90, 1);
            break;
          case 'UP':
            stopSphero(spheroBall);
            break;
          case 'DOWN':
            stopSphero(spheroBall);
            break;
          case 'FORWARD':
             spheroBall.roll(70, 0, 1);
            break;
          case 'REVERSE':
            spheroBall.heading = 180;
            spheroBall.roll(70, 180, 1);
            break;
        }

        console.log('Direction: ', direction);
      }

      controller.connect();
      console.log('waiting for Leap Motion connection...');
      };

  var stopSphero = function(spheroBall) {
    spheroBall.roll(0,spheroBall.heading||0,0);
  };

  console.log("waiting for Sphero connection...");

  device.connect(function() {
  	console.log('connected to Sphero');
    // device.setRGB(spheron.toolbelt.COLORS.PURPLE).setBackLED(255);
    controlSphero(device);
  });

};
