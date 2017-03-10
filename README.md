# epidemic!

This project is a very basic simulator to demonstrate transmission of disease through a moving population.

The purpose is to provide a fun and hopefully easy platform for experimental student coding, where you can start with just editing a few parameters to change the outcome, or dive deeper into the workings to edit the fundamental behaviors.

I tried to make it easy to get up and running, so there is no build system and it uses the version of JavaScript most widely supported by browsers (ES5).

There's just a sprinkling of [Bootstrap](http://getbootstrap.com/) and [jQuery](https://jquery.com/) to simplify laying out the page and working with the HTML. The agent nodes are rendered with [D3](https://d3js.org/), a popular web library for data visualization.

## Getting Started

All you should have to do is open the index.html file in your browser to get it running.

If you'd like to play around and see how your changes affect the sim, the first thing to experiment with is the high-level settings contained in `app.js`.
These settings are at the top of the file in all capital letters, indicating that they are 'constants', which are program values that do not change.

## Code Layout

There are only a few code files here.

- `app.js` has the main setup and sim running code.
- `vectors.js` has potential disease transmission vectors. Try adding a new one!
- `controls.js` contains logic to setup the interface buttons, etc.
- `Agent.js` has the basic logic for each node in the sim, which is an autonomous agent.
- `Agents.js` has the basic logic for managing a list of agents, since none of us can operate independently of others in society. This file has the main logic for moving the agents and checking infection status against one another.

`app.js` and `vectors.js` are the most interesting place to start if you want to tweak how the sim runs. To dig in deeper, jump into `Agents.js` to reconfigure how the people interact with each other. For example, you could make it so only a subset of the total population moves during each sim tick, as if some people are just hanging around for a while.