/**
 * Holds various types of disease transmission vectors.
 * Each one should have a 'check' function that compares two agents to each other to determine if infection should transfer.
 *
 * Some interesting things to try:
 *  - expanding or contracting the radius of contagion to see how that effects propagation rates
 *  - implementing a 'death' level, where nodes can die out and disappear, which means the population actually decays due to the disease
 * @type {{contact: {check: Function}, airborne: {check: Function}}}
 */
var vectors = {

    /**
     * Simple infection based on whether the two agents came in contact.
     * Checks if the distance between two agents is less than the sum of their radii, using Pythagorean Theorum.
     */
    contact: {
        name: 'Contact',
        check: function (agent1, agent2) {
            var distance = Math.sqrt(Math.pow((agent1.x - agent2.x), 2) + Math.pow((agent1.y - agent2.y), 2));
            var buffer = agent1.r + agent2.r;
            if (agent2.infected && distance < buffer) {
                return true;
            }
            return false;
        }
    },

    /**
     * This is a basic airborne vector. The idea is that the contact radius is much larger, but we're introduced
     * a random factor to reduce likelihood that the infection transfers every time.
     */
    airborne: {
        name: 'Airborne',
        check: function (agent1, agent2) {
            var distance = Math.sqrt(Math.pow((agent1.x - agent2.x), 2) + Math.pow((agent1.y - agent2.y), 2));
            var buffer = (agent1.r + agent2.r) * 3; // triple the combined person distance
            var rand = Math.random(); // grab a random number to see if they'll be infected when within range
            if (agent2.infected && (distance < buffer) && rand > 0.7) {
                return true;
            }
            return false;
        }
    }

};