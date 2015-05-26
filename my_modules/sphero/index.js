module.exports = function() {

  var Leap = require('leapjs');
  var sphero = require("sphero");

  // Set this to the device Sphero connects as on your computer.
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
      controller.on('focus', function() {
          console.log('focus?');
      });
      controller.on('deviceStreaming', function() {
          console.log('device connected');
      });
      controller.on('deviceStopped', function() {
          console.log('device disconnected');
      });
      controller.on('frame', function(frame) {
        // if(frame.valid && frame.gestures.length > 0){
          // frame.gestures.forEach(function(gesture){
            // if(gesture.type == 'swipe'){
              if(frame.hands[0]){
                var g = frame.hands[0];
                handleSwipe(g);
              }
            // }
          // });
        // }
      });


      var handleSwipe = function(g) {
        // var g = frame.hands[0];
            var previousFrame = controller.frame(1);
            var movement = g.translation(previousFrame);
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
            // Original settings included: 'sphero.heading = (heading value)';
            // Original speed for all of them: 128.
            case 'LEFT':
              console.log('left')
              //sphero.roll(speed, heading, state, option)
              spheroBall.roll(70, 270, 1); //Heading is expressed in degrees so 270 will make the ball move to the left.
              break;
            case 'RIGHT':
              spheroBall.heading = 90;
              spheroBall.roll(70, 90, 1);
              break;
            case 'UP':
              stopSphero(spheroBall);
              console.log('up')
              //Make the ball turn blue when users move their hand up.
              // ball.setRGB(spheron.toolbelt.COLORS.BLUE).setBackLED(255);
              break;
            case 'DOWN':
              stopSphero(spheroBall);
              //Make the ball turn white when users move their hand down.
               // ball.setRGB(spheron.toolbelt.COLORS.WHITE).setBackLED(255);
              break;
            case 'FORWARD':
               spheroBall.roll(70, 0, 1);
              break;
            case 'REVERSE':
              spheroBall.heading = 180;
              spheroBall.roll(70, 180, 1);
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
  var stopSphero = function(spheroBall) {
      spheroBall.roll(0,spheroBall.heading||0,0);
  };

  console.log("waiting for Sphero connection...");

  device.connect(function() {
  	console.log('connected to Sphero');
      // ball.setRGB(spheron.toolbelt.COLORS.PURPLE).setBackLED(255);
      controlSphero(device);
  });

};
