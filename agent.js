'use strict';

const cos = require('./lib/cos');

module.exports = agent => {
  if (agent.config.cos.useAgent) {
    cos(agent);
  }
};
