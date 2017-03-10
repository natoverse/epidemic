// these are the configuration variables we can change for how our simulation looks and runs
var AGENT_COUNT = 100;
var MAX_X = $('svg').width();
var MAX_Y = $('svg').height();
var RADIUS = 10;
var INFECTED_BORDER = '#CB4335';
var INFECTED_FILL = '#F5B7B1';
var HEALTHY_BORDER = '#34495E';
var HEALTHY_FILL = '#85929E';
var MAX_VELOCITY = 5;
var STARTING_INFECTION_RATE = 0.1;
var SEVERITY = 60; // how many frames it takes for the disease to go away
var FPS = 30;

var agents = new Agents({
    vector: vectors.contact,
    infectionRate: STARTING_INFECTION_RATE,
    severity: SEVERITY
});

function setup() {
    // setup a bunch of agents with random positions and velocities
    for (var i = 0; i < AGENT_COUNT; i += 1) {
        var agent = new Agent({
            x: Math.random() * $('svg').width(),
            y: Math.random() * $('svg').height(),
            r: RADIUS,
            xVelocity: Math.random() * MAX_VELOCITY * (Math.random() > 0.5 ? 1 : -1),
            yVelocity: Math.random() * MAX_VELOCITY * (Math.random() > 0.5 ? 1 : -1)
        });
        agents.add(agent);
    }
    agents.resetInfections();
}

// the tick function runs every time the interval passes
// this is our game loop, where we need to move each agent, check if they will now infect each other, and then render the current state
function tick() {
    agents.move({
        minX: 0,
        maxX: $('svg').width(),
        minY: 0,
        maxY: $('svg').height()
    });
    agents.infect();
    agents.render();
}

var handle = 0;

function toggle() {
    if (handle == 0) {
        // this is where we start the game loop
        // 'setInterval' is a built-in JavaScript function that runs another function every x milliseconds
        // here we've set it to run the tick function at a rate that gives us the desired frames per second animation
        // the 'handle' variable lets us refer to this interval later to cancel it
        handle = setInterval(tick, 1000 / FPS);
    } else {
        // 'clearInterval' stops a currently running interval, using the ID that we got when we started it
        clearInterval(handle);
        handle = 0;
    }
}

setup();
agents.init();
controls.init();
toggle();
