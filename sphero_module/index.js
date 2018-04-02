const Leap = require('leapjs'),
      sphero = require("sphero");
let newDirection = '?';
let previousDirection, controller;

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const UP = 'UP';
const DOWN = 'DOWN';
const FORWARD = 'FORWARD';
const BACKWARD = 'BACKWARD';

// Set this to the port the Sphero uses on your computer.
// If this one does not work, enter `ls /dev/tty*` in your terminal to find the
// right one (on Mac).
const spheroBall = sphero("/dev/tty.Sphero-RBR-AMP-SPP");

const spheroModule = () => {
  initConnections();
}

const initConnections = () => {
  console.log("Waiting for Sphero connection...");

  spheroBall.connect(() => {
  	console.log('Connected to Sphero');
    initLeapMotionConnection();
  });
}

const initLeapMotionConnection = () => {
  controller = Leap.loop({frameEventName:'deviceFrame', enableGestures:true});
  console.log('waiting for Leap Motion connection...');

  controller.connect();

  controller.on('connect', () => {
    console.log('connected to leap motion');
  });
  controller.on('ready', () => {
      console.log('ready');
  });
  controller.on('deviceStreaming', () => {
      console.log('device connected');
  });
  controller.on('deviceStopped', () => {
      console.log('device disconnected');
  });
  controller.on('frame', frame => {
    if (frame.hands[0]) handleSwipe(frame.hands[0]);
  });
}

const handleSwipe = hand => {
  let previousFrame = controller.frame(1);
  let movement = hand.translation(previousFrame);
  previousDirection = newDirection;

  if(movement[0] > 4){
    newDirection = RIGHT;
  } else if(movement[0] < -4){
    newDirection = LEFT;
  }

  if(movement[1] > 4){
    newDirection = UP;
  } else if(movement[1] < -4){
    newDirection = DOWN;
  }

  if(movement[2] > 4){
    newDirection = BACKWARD;
  } else if(movement[2] < -4){
    newDirection = FORWARD;
  }

  if(previousDirection !== newDirection){
    console.log('Direction: ', newDirection);
    moveSphero(newDirection);
  } else {
    return;
  }
}

const moveSphero = direction => {
  switch (direction) {
    case LEFT:
      //sphero.roll(speed, heading, state, option). Heading is expressed in degrees.
      spheroBall.roll(70, 270, 1);
      break;
    case RIGHT:
      spheroBall.heading = 90;
      spheroBall.roll(70, 90, 1);
      break;
    case UP:
      stopSphero(spheroBall);
      break;
    case DOWN:
      stopSphero(spheroBall);
      break;
    case FORWARD:
       spheroBall.roll(70, 0, 1);
      break;
    case BACKWARD:
      spheroBall.heading = 180;
      spheroBall.roll(70, 180, 1);
      break;
    default:
      stopSphero(spheroBall);
  }
}

const stopSphero = spheroBall => {
  spheroBall.roll(0,spheroBall.heading||0,0);
};

module.exports = spheroModule;

