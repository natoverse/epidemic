/**
 * Holds a list of agents for a simulation.
 * It moves all of the agents at each simulation tick,
 * and handles the rendering of all agents using D3.
 * @param params - a few starting properties to configure the agent list behavior.
 * @constructor
 */
var Agents = function (params) {
    this.vector = params.vector;
    this.infectionRate = params.infectionRate || 0.10;
    this.severity = params.severity || 20;
    this.agents = params.agents || [];
};

/**
 * Add a new agent to this list.
 * @param agent
 */
Agents.prototype.add = function (agent) {
    this.agents.push(agent);
};

/**
 * Restarts with random infection state, based on the configured infection rate (percentage of population).
 */
Agents.prototype.resetInfections = function () {
    this.agents.forEach(function (agent) {
        agent.infected = Math.random() < this.infectionRate ? true : false;
    }, this);
};

/**
 * Let's us change the transmission vector used during the simulation.
 * @param vector
 */
Agents.prototype.setVector = function (vector) {
    this.vector = vector;
};

/**
 * Setup the agents with initial rendering.
 */
Agents.prototype.init = function () {
    var svg = d3.select('svg');
    svg.selectAll('circle')
        .data(this.agents)
        .enter().append('circle')
        .attr('r', function (d) { return d.r; });
};

/**
 * Move each agent in the list, using their individual move logic.
 */
Agents.prototype.move = function (bounds) {
    this.agents.forEach(function (agent) {
        agent.move(bounds);
    });
};

/**
 * Check if any of our agents should make another one sick.
 */
Agents.prototype.infect = function () {
    // just check each one against each other one, brute force
    // note that there are lots of problems with this approach, besides inefficiency...
    // TODO: keep an "infected list" to limit search space
    // the 'forEach' function loops through every item in a list
    var infectedCount = 0;

    this.agents.forEach(function (agent1) {

        // check if the current agent should be infected by any of the other agents
        // the 'some' function loops through all items in a list until at least one returns 'true', at which point it exits the loop
        // the return value of 'some' is either 'true' indicating that at least one item met the condition, or 'false', meaning that none did
        var infected = this.agents.some(function (agent2) {
            // don't check an agent against itself...
            if (agent1.id === agent2.id) {
                return false;
            }
            return this.vector.check(agent1, agent2);
        }, this);

        if (infected) {
            // they are now freshly infected or worsened by fresh contact, so set their disease severity counter
            agent1.infected = true;
            agent1.severity = this.severity;
        }

        if (agent1.infected) {
            infectedCount++;
            agent1.severity--; // decay their current illness each time the loop rungs, until they heal
            if (agent1.severity <= 0) {
                infectedCount--;
                agent1.infected = false;
            }
        }

    }, this);

    this.infectedCount = infectedCount;
};

/**
 * Render all of the agents to screen in their current position, colored according to infection status.
 */
Agents.prototype.render = function () {
    var svg = d3.select('svg');
    svg.selectAll('circle')
        .attr('cy', function (d) { return d.y; })
        .attr('cx', function (d) { return d.x; })
        .attr('stroke', function (d) {
            if (d.infected) {
                return INFECTED_BORDER;
            }
            return HEALTHY_BORDER;
        })
        .attr('fill', function (d) {
            if (d.infected) {
                return INFECTED_FILL;
            }
            return HEALTHY_FILL;
        });
    // update the displayed infected/healthy counts
    $('#infected-count').text(this.infectedCount);
    $('#healthy-count').text(this.agents.length - this.infectedCount);

};