/**
 * An individual agent that can move itself.
 * @param params
 * @constructor
 */
var Agent = function (params) {
    this.infected = params.infected;
    this.x = params.x;
    this.y = params.y;
    this.r = params.r;
    this.xVelocity = params.xVelocity;
    this.yVelocity = params.yVelocity;
    this.id = Math.random() * 1000000;
};

/**
 * This is where we put the logic to move the agent.
 * The simple implementation goes one step in the current xand y velocity,
 * and turns around if we bump into the boundary.
 * @param bounds - the bounds of our allowed movement area (minX, maxX, minY, maxY).
 */
Agent.prototype.move = function (bounds) {
    this.x = this.x + this.xVelocity;
    this.y = this.y + this.yVelocity;
    if (this.x < bounds.minX || this.x > bounds.maxX) {
        this.xVelocity = this.xVelocity * -1;
    }
    if (this.y < bounds.minY || this.y > bounds.maxY) {
        this.yVelocity = this.yVelocity * -1;
    }
};