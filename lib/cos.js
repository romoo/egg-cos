'use strict';

const assert = require('assert');
const COS = require('cos-nodejs-sdk-v5');

const createOneClient = (config, app) => {
  assert(config.secretId && config.secretKey, '[egg-cos] secretId secretKey is required on config');
  app.coreLogger.info('[egg-cos] init %s', config.secretId);

  return new COS({
    SecretId: config.secretId,
    SecretKey: config.secretKey,
  });
};

module.exports = app => {
  app.addSingleton('cos', createOneClient);
};
