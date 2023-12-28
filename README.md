# egg-cos

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-cos.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-cos
[travis-image]: https://img.shields.io/travis/romoo/egg-cos.svg?style=flat-square
[travis-url]: https://travis-ci.org/romoo/egg-cos
[codecov-image]: https://img.shields.io/codecov/c/github/romoo/egg-cos.svg?style=flat-square
[codecov-url]: https://codecov.io/github/romoo/egg-cos?branch=master
[david-image]: https://img.shields.io/david/romoo/egg-cos.svg?style=flat-square
[david-url]: https://david-dm.org/romoo/egg-cos
[snyk-image]: https://snyk.io/test/npm/egg-cos/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-cos
[download-image]: https://img.shields.io/npm/dm/egg-cos.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-cos

<!--
Description here.
-->

## Install

```bash
$ npm i egg-cos --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.cos = {
  enable: true,
  package: 'egg-cos',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.cos = {
  client: {
    SecretId: '',
    SecretKey: '',
    Bucket: '',
    Region: '',
  }
};
```

Init in egg agent, default is `false`:

```js
exports.cos = {
  useAgent: true,
};
```

## Usage

You can aquire tencent cloud cos instance on `app` or `ctx`.
// upload a file in controller

- File Mode：The file is temporarily stored as cache in your server during the process;

```js
const path = require('path');
const Controller = require('egg').Controller;

module.exports = class extends Controller {
  async upload() {
    const ctx = this.ctx;
    // please enable `file` mode of `egg-multipart`.
    const file = ctx.request.files[0];
    const name = 'egg-cos/' + path.basename(file.filename);
    let result;
    try {
      result = await ctx.cos.put(name, file.filepath);
    } finally {
      // need to remove the tmp files
      await ctx.cleanupRequestFiles();
    }

    if (result) {
      ctx.logger.info('cos response:\n', result);
      ctx.body = {
        url: `https://${result.Location}`
      };
    } else {
      ctx.body = 'please select a file to upload！';
    }
  }
};
```
- upload by Stream：The file is transfered to cloud server directly, not go through your server;

```js
const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
async upload() {
  const ctx = this.ctx;
  const parts = ctx.multipart();
  let part,results=[];
  while ((part = await parts()) != null) {
      if (part.length) {
          // This is content of part stream
          console.log('field: ' + part[0]);
          console.log('value: ' + part[1]);
          console.log('valueTruncated: ' + part[2]);
          console.log('fieldnameTruncated: ' + part[3]);
      } else {
          if (!part.filename) {
              return;
          }
          console.log('field: ' + part.fieldname);
          console.log('filename: ' + part.filename);
          console.log('encoding: ' + part.encoding);
          console.log('mime: ' + part.mime);
          console.log("part",part.stream,typeof part);
          // file processing, uploading the file to Tencent Cloud Server
          let result;
          let path=await ctx.helper.MD5encode(String(Date.now()));
          let typeArray=part.mime.split('/');
          let type=typeArray[typeArray.length-1];
          let name='ysxbdms/projects/'+path+`.${type}`;//the upload links
          try {
              result = await ctx.cos.putStream(name,part);
          } catch (err) {
              await sendToWormhole(part);
              throw err;
          }
          console.log(result);
          results.push(result);
      }
  }
  console.log('and we are done parsing the form!');
  ctx.body=results;
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/romoo/egg-cos/issues).

## License

[MIT](LICENSE)
