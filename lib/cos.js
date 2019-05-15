'use strict';

const assert = require('assert');
const util = require('util');
const COS_NODEJS_SDK = require('cos-nodejs-sdk-v5');

class COS extends COS_NODEJS_SDK {
  constructor(options) {
    super(options);
    this.Bucket = options.Bucket || '';
    this.Region = options.Region || '';
  }
  /**
   * 上传本地文件到COS文件储存桶
   * @param {String} Key 设定上传到cos的路径
   * @param {String} FilePath 本地需要上传的文件
   * @param {Object} options 设定Bucket存储桶和Region区域的选项
   * @return {Promise<Object>} Promise包裹的data
   */
  put(Key, FilePath, options = {}) {
    const Bucket = options.Bucket || this.Bucket;
    const Region = options.Region || this.Region;
    const sliceUploadFile = util.promisify(super.sliceUploadFile).bind(this);
    return sliceUploadFile({ Bucket, Region, Key, FilePath });
  }
}

const createOneClient = (config, app) => {
  assert(config.SecretId && config.SecretKey, '[egg-cos] `SecretId` `SecretKey` is required on config');
  app.coreLogger.info('[egg-cos] init %s', config.SecretId);

  return new COS({
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
  });
};

module.exports = app => {
  app.addSingleton('cos', createOneClient);
};
